<template>
  <section id="mailform" class="section">
    <div class="container">
      <div class="heading">
        <h1 class="title">Amazon SES Send Form</h1>
        <h3 class="subtitle">
          A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
        </h3>
      </div>
      <div class="">
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
              <button class="button is-primary" v-if='emailObject["is-success"]'>Submit</button>
              <button class="button is-primary" v-else disabled>Submit</button>
            </p>
            <p class="control">
              <button class="button is-link">Cancel</button>
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
      }
    }
  },
  methods: {
    emailValidation: function(event){
      var match = event.currentTarget.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      this.emailObject["is-success"] = match;
      this.emailObject["is-danger"] = !match;
    }
  }
}
</script>
<style>
</style>
