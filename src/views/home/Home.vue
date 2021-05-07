<template>
  <el-container class="home-container">
    <!-- 1.头部区域 -->
    <el-header>
      <div>
        <img src="@/assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 2.页面主体区域 -->
    <el-container>
      <!-- 2.1侧边栏 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff"
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 unique-opened
                 router
                 :default-active="activePath">

          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id"
                          @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {getMenuArray} from '@/network/home.js'

  export default {
    name: "Home",
    data() {
      return {
        menuList: [],
        iconsObj: {
          125: 'iconfont icon-user',
          103: 'iconfont icon-tijikongjian',
          101: 'iconfont icon-shangpin',
          102: 'iconfont icon-danju',
          145: 'iconfont icon-baobiao'
        },
        // 是否折叠
        isCollapse: false,
        activePath:''
      }
    },
    created() {
      this.getMenuList()
      this.activePath=window.sessionStorage.getItem('activePath')
    },
    methods: {
      logout(){
        window.sessionStorage.clear()
        this.$router.push("/login")
      },
      // 获取所有的菜单
      async getMenuList() {
        const res = await getMenuArray()
        if (res.meta.status !== 200) return this.message.error(res.meta.msg)
        this.menuList = res.data
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath=activePath
      }

    }
  }
</script>

<style lang="less" scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    display: flex;
    justify-content: space-between;
    background-color: #373d41;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;

    .el-menu {
      border-right: none
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    text-align: center;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: 0.3em;
    cursor: pointer;
  }

</style>
