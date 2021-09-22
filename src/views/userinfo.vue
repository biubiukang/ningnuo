<template>
  <div class="form">
    <div class="form-group">
      <div class="mb-2vh">
        <label for="name">姓名（必填）</label>
        <input name="name" class="string" v-model="username" required />
      </div>
      <div class="mb-2vh">
        <label for="sex">性别（必填）</label>
        <input name="sex" class="string" v-model="sex" required />
      </div>
      <div class="mb-2vh">
        <label for="school">学院（必填）</label>
        <input name="school" class="string" v-model="school" required />
      </div>
      <div class="mb-2vh">
        <label for="subject">专业（必填）</label>
        <input name="subject" class="string" v-model="subject" required />
      </div>
      <div class="mb-2vh">
        <label for="mobile">电话（必填）</label>
        <input name="mobile" class="string" v-model="mobile" required />
      </div>
      <div class="mb-2vh">
        <label for="wxno">微信号（必填）</label>
        <input name="wxno" class="string" v-model="wxNo" required />
      </div>
      <div class="mb-2vh">
        <label for="targetjob">期望职业</label>
        <input name="targetjob" class="string" v-model="targetJob" />
      </div>

      <input
        name="submit"
        class="btn"
        @click="start()"
        type="submit"
        value=""
      />
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/user";
import { updateUserInfo } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "Userinfo",
  props: {
    context: String,
  },
  created() {
    getUserInfo()
      .then((res) => {
        Toast.clear();
        const info = res.data;
        if (res.code && res.code !== 200) {
          Toast({
            message: res.msg,
          });
        } else {
          this.username = info.username;
          this.sex = info.sex;
          this.school = info.school;
          this.subject = info.schoolSubject;
          this.mobile = info.mobile;
          this.wxNo = info.wxNo;
          this.targetJob = info.targetJob;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      username: "张三",
      sex: null,
      school: null,
      subject: null,
      mobile: null,
      wxNo: null,
      targetJob: null,
    };
  },
  methods: {
    start() {
      
      updateUserInfo({
        username: this.username,
        sex: this.sex,
        school: this.school,
        subject: this.subject,
        mobile: this.mobile,
        wxNo: this.wxNo,
        targetJob: this.targetJob,
      })
        .then((res) => {
          Toast.clear();
          const info = res.data;
          if (res.code && res.code !== 200) {
            Toast({
              message: res.msg,
            });
          } else {
            this.$parent.slideUp();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
.form {
  display: inline-block;
  margin-top: 26vh;
}
.form-group {
  font-size: 0.4rem;
  text-align: left;
  color: #39291c;
  margin-bottom: 15px;
}
.form-group label {
  padding-left: 25px;
}
.mb-2vh {
  margin-bottom: 3vh;
}
input {
  width: 140px;
  height: 25px;
  float: right;
  border: none;
  display: block;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  font-family: "Source Sans Pro", sans-serif;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 10px;
}

input[type="submit"] {
  cursor: pointer;
}

input[class="string"] {
  background: rgba(255, 255, 255, 0.096)
    url(http://luismruiz.com/img/gemicon_email.png) no-repeat scroll 16px 16px;
  padding-left: 5px;
  margin-right: 30px;
}

input:focus,
textarea:focus {
  background-color: rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5);
  -webkit-box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.btn {
  background-color: unset;
  width: 138px;
  height: 44px;
  border: none;
  position: absolute;
  bottom: 6vh;
  left: 25vw;
  display: block;
}

.btn:active {
  background-color: unset;
  width: 138px;
  height: 44px;
  border: none;
  position: absolute;
  bottom: 6vh;
  left: 25vw;
  display: block;
}
</style>