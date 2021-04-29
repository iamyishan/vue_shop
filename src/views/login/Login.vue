<template>
    <div class="login_container">
        <!-- 登录盒子  -->
        <div class="login_box">
            <!-- 登录头像-->
            <div class="avatar_box">
                <img src="@/assets/road.jpg">
            </div>
            <!--   登录表单-->
            <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px">
                <!-- 用户名 -->
                <el-form-item label="账号" prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
                </el-form-item>
                <!--   密码-->
                <el-form-item label="密码" prop="password">
                    <el-input type="password" prefix-icon="iconfont icon-3702mima"
                              v-model="loginForm.password"></el-input>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                // 这是登录表单的数据绑定对象
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                // 这是表单的验证规则对象
                loginFormRules: {
                    // 验证用户名是否合法
                    username: [{required: true, message: '请输入登录名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                        ],
                    password:[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            resetLoginForm(){
                this.$refs.loginFormRef.resetFields()
            },
            login(){
                // await 操作符用于等待一个 Promise 对象，它只能在异步函数 async function 内部使用
                this.$refs.loginFormRef.validate( async valid=>{
                    if(!valid) return
                    const {data:res}= await this.$http.post('login',this.loginForm)
                    if (res.meta.status!==200) return this.$message.error("登录失败！")
                    this.$message.success('登录成功')
                    // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                    //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                    //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                    window.sessionStorage.setItem("token",res.data.token)
                    // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                    this.$router.push('/home')
                    }
                )

            }
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background-color: #2b5b6b;
        height: 100%;
    }

    .login_box {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 450px;
        height: 300px;
        background-color: #fff;
        border-radius: 3px;
        transform: translate(-50%, -50%);
    }

    .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 130px;
        width: 130px;
        box-shadow: 0 0 10px #ddd;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 50%;
        background-color: #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .login_form {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;

    }


</style>