import Vue from 'vue'
import Mailform from "./Mailform.vue"

const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1"
})

new Vue({
  el: '#mailform',
  render: h => h(Mailform)
})
