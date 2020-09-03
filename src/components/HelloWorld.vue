<template>
<div class="cont">
    <a-row>
      <a-col :span="12" :offset="6">
        <a-divider>设置颜色</a-divider>
        <h2>预设颜色</h2>
        <div class="yscont">
          <div class="ysitem" style="background:#3e91f7" @click="click('#3e91f7')"></div>
          <div class="ysitem" style="background:#e23c39" @click="click('#e23c39')"></div>
          <div class="ysitem" style="background:#e96033" @click="click('#e96033')"></div>
          <div class="ysitem" style="background:#f0af41" @click="click('#f0af41')"></div>
          <div class="ysitem" style="background:#58bfc1" @click="click('#58bfc1')"></div>
          <div class="ysitem" style="background:#72c140" @click="click('#72c140')"></div>
          <div class="ysitem" style="background:#3258e3" @click="click('#3258e3')"></div>
          <div class="ysitem" style="background:#6839c9" @click="click('#6839c9')"></div>
        </div>
        <h2>自定义颜色</h2>
        <a-input type="color" style="width:100px;margin-bottom:10px" v-model="color" @change="huan"></a-input>
        <a-divider>效果展示</a-divider>
        <a-button-group style="margin-right:10px">
          <a-button>Cancel</a-button>
          <a-button type="primary">OK</a-button>
        </a-button-group>
        <a-button-group>
          <a-button type="primary">L</a-button>
          <a-button>M</a-button>
          <a-button>M</a-button>
          <a-button type="dashed">R</a-button>
        </a-button-group>
        <br />
        <a-radio-group>
          <a-radio-button value="a">Hangzhou</a-radio-button>
          <a-radio-button value="b">Shanghai</a-radio-button>
          <a-radio-button value="c">Beijing</a-radio-button>
          <a-radio-button value="d">Chengdu</a-radio-button>
        </a-radio-group>

        <a-menu theme="dark">
          <a-sub-menu key="sub4">
            <span slot="title"><a-icon type="setting" /><span>Navigation Three</span></span>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-menu>
        <a-pagination :total="50" />

        <a-checkbox-group >
            <a-checkbox value="A">A</a-checkbox>
            <a-checkbox value="B">B</a-checkbox>
            <a-checkbox value="C">C</a-checkbox>
            <a-checkbox value="D">D</a-checkbox>
            <a-checkbox value="E">E</a-checkbox>
        </a-checkbox-group>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    data () {
    return {
      color: ''
    }
  },
  methods: {
    click (color) {
      this.color = color
      this.huan()
    },
    huan () {
      window.less
        .modifyVars({
          '@primary-color': this.color,
          '@link-color': this.color,
          '@btn-primary-bg': this.color
        })
        .then(() => {
          console.log('成功')
        })
        .catch(error => {
          alert('失败')
          console.log(error)
        })
    }
  }
}
</script>


<style scoped>
.cont {
  padding: 100px 0;
}
.yscont {
  display: flex;
  margin-bottom: 10px;
}
.ysitem {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
}
.ysitem:hover {
  box-shadow: 2px 2px 2px #999;
}
</style>
