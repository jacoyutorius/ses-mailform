<template>
  <section id="mailform" class="section">
    <div class="container">
      <div class="">

        <div class="notification is-primary" v-if="sendResult==1">
          <button class="delete" v-on:click="clearInputs"></button>
          メールが送信されました.
          { MessageId:  {{sendObj["MessageId"]}}, RequestId: {{sendObj["RequestId"] }} }
        </div>
        <div class="notification is-danger" v-if="sendResult==2">
          <button class="delete" v-on:click="clearInputs"></button>
          メールの送信に失敗しました.
          { Message: {{sendObj["err_message"]}} }
        </div>

        <form>
          <!-- email -->
          <label class="label">Email</label>
          <p class="control has-icon has-icon-right">
            <input class="input" v-bind:class="emailObject" type="text" placeholder="Email input" v-model="email" v-on:change="emailValidation">
            <span class="icon is-small">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="help is-success" v-if='emailObject["is-success"]'>This Email is available</span>
            <span class="help is-danger" v-if='emailObject["is-danger"]'>This Email is invalid</span>
          </p>

          <!-- subject -->
          <label class="label">Subject</label>
          <p class="control">
            <input class="input" type="text" placeholder="Subject input" v-model="subject">
          </p>

          <!-- message -->
          <label class="label">Message</label>
          <p class="control">
            <textarea class="textarea" placeholder="Textarea" v-model="message"></textarea>
          </p>

          <!-- buttons -->
          <div class="control is-grouped">
            <p class="control">
              <button type="button" class="button is-primary" v-if='emailObject["is-success"]' v-on:click="sendEmailWithSES">Submit</button>
              <button type="button" class="button is-primary" v-else disabled>Submit</button>
            </p>
            <p class="control">
              <button type="button" class="button is-link" v-on:click="clearInputs">Clear</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'mailform',
  data () {
    return {
      email: "",
      subject: "",
      message: "",
      validateResult: "input",
      emailObject: {
        "is-success": false,
        "is-danger": false
      },
      sendResult: 0, // 0:通常、1:成功、2:失敗
      sendObj: {
        "MessageId": "",
        "RequestId": "",
        "err_message": "",
        "err_stack": "",
      }
    }
  },
  methods: {
    emailValidation: function(event){
      var match = event.currentTarget.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      this.emailObject["is-success"] = match;
      this.emailObject["is-danger"] = !match;
    },
    clearInputs: function(event) {
      this.email = this.subject = this.message = "";
      this.emailObject["is-success"] = false;
      this.emailObject["is-danger"] = false;
      this.sendResult = 0;
    },
    sendEmailWithSES: function(event){
      var ses = new AWS.SES();
      var params = {
        Destination: {
          // ToAddresses: ["yuto.ogi@fourier.jp"]
          ToAddresses: [this.email]
        },
        Message: {
          Body:{
            Text: {
              // Data: "こんにちはSES",
              Data: this.message,
              Charset: "utf-8"
            }
          },
          Subject: {
            Data: this.subject,
            Charset: "utf-8"
          }
        },
        Source: "yuto.ogi@fourier.jp"
      };

      ses.sendEmail(params, function(err, data){
        if(err){
          console.log(err, err.stack);

          this.sendResult = 2;
          this.sendObj["err_message"] = err.message;
          this.sendObj["err_stack"] = err.trace;
        }
        else{
          this.sendResult = 1;
          this.sendObj["MessageId"] = data.MessageId;
          this.sendObj["RequestId"] = data.ResponseMetadata.RequestId;

          // clear inputs
          this.email = this.subject = this.message = "";
          this.emailObject["is-success"] = false;
        }
      }.bind(this));
    }
  }
}
</script>
<style>
</style>
