<template>
  <div class="login">
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>登陆</p>
        </div>
        <el-form :model="form" :rules="rules" ref="From">
          <el-form-item prop="name">
            <el-input prefix-icon="el-icon-user" v-model="form.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-reading" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="captcha_code">
            <el-input style="width: 200px;" prefix-icon="el-icon-picture" v-model="form.captcha_code"
              placeholder="请输入验证码"></el-input>
            <div class="img_div" style="display: inline-block" @click="changeCode">
              <el-image style="width: 90px; height: 40px" :src="code_Url"></el-image>
            </div>
          </el-form-item>
          <div class="content_button">
            <el-button type="primary" @click="onLogin('From')" style="width: 200px;">登陆</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import $http from '@/utils/requests.js'
  export default {
    name: "Login",
    data() {
      return {
        code: "",
        code_Url: "",
        form: {
          name: "",
          password: "",
          captcha_code: ""
        },
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          captcha_code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.changeCode();
    },
    methods: {
      onLogin(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
            if (valid) {
              if (this.form.captcha_code.toLocaleLowerCase() != this.code.toLocaleLowerCase()) {
                  this.$message({
                    type:"warning",
                    title: '警告',
                    message:'验证码不正确,请重新输入',
                  })
                  return false;
              } else {
              $http.post("/api/login", this.form).then((res) => {
                if (res.data.code == 200) {
                  // 200则账号密码正确
                  localStorage.setItem("token", res.token)
                  that.$router.push({
                    "path": "/index"
                  })
                } else {
                  console.log(res)
                  // 不然则提示对应的信息
                  this.$notify({
                    title: '警告',
                    message: res.data.message,
                    type: 'warning'
                  });
                  return false;
                }
              }).catch((error) => {
                console.log(error)
              })

            }
            }else {
              return false;
          }
        });
      },
      changeCode() {
        let that = this;
        $http.get("/api/get_code").then((res) => {
          that.code = res.data.code;
          that.code_Url = "";
          that.code_Url = res.data.url + '?' + new Date().getTime();
        })
      }
    }
  }
</script>

<style scoped>
  .img_div:hover {
    cursor: pointer;
  }

  .el-image {
    vertical-align: bottom;
    margin-left: 10px;
  }

  .captcha_code {
    display: inline-block;
    padding: 0 15px;
    margin-left: 30px;
    width: 60px;
    height: 40px;
    line-height: 40px
  }

  img {
    width: 60px !important;
    height: 40px;
  }

  .content {
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.7);
    background: #FFFFFF;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: mymove 1s ease-in-out alternate;
    overflow: hidden;
    transition: 1.5s;
  }

  .content_input {
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 25px;
    font-weight: bold;
    color: #606266;
  }



  .content_button {
    margin-top: 10px;
  }

  .login {
    background-image: url(../assets/background.a568162c.svg);
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
  }
</style>
