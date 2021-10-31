<template>
  <div class="index">
    <div class="mleft">
      <h3 class="logo iconfont">&#xe611;&#xe607;&#xe608;&#xe610;</h3>
      <p>百日练字<sup>beta</sup></p>
    </div>

    <dl class="mdl">
      <dd>
        <router-link :to="{ path: 'good' }">
          <h3>作品创作临写</h3>
          <p>自定义创作内容，规划作品格式，自定义书写字体。</p>
        </router-link>
      </dd>
      <dd>
        <router-link :to="{ path: 'art' }">
          <h3>作文对照临写</h3>
          <p>自定义排版，完美解决行尾标点问题。可自己设置字体！</p>
        </router-link>
      </dd>
      <dd>
        <router-link :to="{ path: 'classic' }">
          <h3>生字对照临写</h3>
          <p>可单行对照临写，可自己设置字体！</p>
        </router-link>
      </dd>
      <dd><hr /></dd>
      <dd>
        <h3>书法字体下载推荐<sup>(有版权的字体请勿做商用)</sup></h3>
        <ul>
          <li>
            <a
              href="http://www.foundertype.com/index.php/FindFont/index/hot/118/p/1.html"
              target="_blank"
              >方正书法字体下载</a
            >
          </li>
        </ul>
      </dd>
      <dd>
        <h3>问题帮助</h3>
        <ul>
          <li>
            <a
              href="/images/print.png"
              target="_blank"
              >打印设置</a
            >
          </li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref(10)
</script>

<style lang="scss" scoped>
$c: #395260;
$red: #900;
.index {
  padding: 40px;
  display: flex;
  gap: 20px;
  min-height: 100vh;
  box-sizing: border-box;
}
.logo {
  font-size: 40px;
  color: $red;
}
a {
  color: $c;
  text-decoration: none;
  &:hover {
    color: $red;
  }
}

.mdl {
  width: 100%;
  dd {
    padding: 0 0 10px 0;

    h3 {
      color: $c;
      &:hover {
        color: $red;
      }
    }
    p {
      color: #666;
      margin: 5px 0;
    }
    ul {
      padding: 5px 0;
    }
  }
}
.mleft {
  width: 240px;
  display: flex;
  justify-content: space-between;
  flex-flow: column nowrap;
  p {
    color: #666;
  }
}
</style>
