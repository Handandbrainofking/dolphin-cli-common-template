<template>
  <div>
    <wxc-minibar
      title="Dolphin Weex Ui"
      background-color="#009ff0"
      text-color="#FFFFFF"
      right-text="Home"
      @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
      @wxcMinibarRightButtonClicked="minibarRightButtonClick"
    ></wxc-minibar>
    <scroller>
      <catalog title="工具"></catalog>
      <wxc-cell
        :label="item.label"
        :title="item.name"
        :has-arrow="true"
        @wxcCellClicked="jumpTo(item.url)"
        :key="index"
        v-for="(item,index) in tool"
        :has-margin="false"
      ></wxc-cell>
      <catalog title="UI库"></catalog>
      <wxc-cell
        :label="item.label"
        :title="item.name"
        :has-arrow="true"
        @wxcCellClicked="jumpTo(item.url)"
        :key="index"
        v-for="(item,index) in frameWork"
        :has-margin="false"
      ></wxc-cell>
      <catalog title="文档"></catalog>
      <wxc-cell
        :label="item.label"
        :title="item.name"
        :has-arrow="true"
        @wxcCellClicked="jumpTo(item.url)"
        :key="index"
        v-for="(item,index) in documentation"
        :has-margin="false"
      ></wxc-cell>
    </scroller>
  </div>
</template>

<script>
import { WxcMinibar, WxcCell } from "weex-ui";
import catalog from "../catalog.vue";
const modal = weex.requireModule("modal");
const globalEvent = weex.requireModule("globalEvent");
module.exports = {
  data: function() {
    return {
      tool: [
        {
          name: "脚手架工具(dolphin-weex-cli)",
          label: "脚手架",
          text: "",
          url: "toolkit.js"
        }
      ],
      frameWork: [
        {
          name: "UI库(dolphin-weex-ui)",
          label: "ui library",
          text: "",
          url: "uiLibrary.js"
        }
      ],
      documentation: [
        { name: "文档(doc)", label: "doc", text: "", url: "doc.js" },
      ]
    };
  },
  components: {
    catalog,
    WxcMinibar,
    WxcCell
  },
  mounted: function() {
    globalEvent.addEventListener("androidback", e => {
      this.$pop();
    });
  },
  methods: {
    jumpTo(file) {
      if (file) {
        var url = file;
        this.$MD.route.push(url);
      }
    },
    back() {
      this.$pop();
    },
    minibarLeftButtonClick() {},
    minibarRightButtonClick() {
      modal.toast({ message: "click rightButton!", duration: 1 });
      const url = "app.js";
      this.$MD.route.push(url);
    }
  }
};
</script>
<style lang="sass" scoped>
@import "../../css/common.css"
</style>

