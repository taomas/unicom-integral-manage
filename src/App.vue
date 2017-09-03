<template>
    <div id="app">
        <router-view></router-view>
        <!--<ul class="footer-menu ly-row-flex flex-start">
            <li class="menu-item">首页</li>
            <li class="menu-item">个人资料</li>
            <li class="menu-item">账户管理</li>
        </ul>-->
    </div>
</template>
<style>
    @import './assets/css/layout.css';
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    body {
      font-family: "PingFangSC-Light", "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>
