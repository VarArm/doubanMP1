<template>
  <div>
    <div class="content">
      <h1>{{ title }}</h1>
      <div class="imgList">
        <div v-for="(item, index) in dataList" :key="index" class="item">
          <img :src="item.images.small" alt />
          <div class="name">{{ item.title }}</div>
          <div class="score">
            <div v-if="item.start != 0">
              <span v-if="item.start >= 1" class="start1"></span>
              <span v-else class="start2"></span>
              <span v-if="item.start >= 2" class="start1"></span>
              <span v-else class="start2"></span>
              <span v-if="item.start >= 3" class="start1"></span>
              <span v-else class="start2"></span>
              <span v-if="item.start >= 4" class="start1"></span>
              <span v-else class="start2"></span>
              <span v-if="item.start >= 5" class="start1"></span>
              <span v-else class="start2"></span>
              <span class="word">{{ item.rating.average }}</span>
            </div>
            <div v-else>暂无评分</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wxrequest from "../../utils/js/wxrequest.js";
export default {
  data() {
    return {
      type: "",
      tltle: "",
      url: "https://api.douban.com/v2/movie/",
      // apikey
      apikey: "apikey=0df993c66c0c636e29ecbb5344252a4a",
      dataList: [],
      // 开始位置
      start: 0,
      // 获取条数
      count: 9
    };
  },
  methods: {
    async getDataList() {
      wx.showNavigationBarLoading();
      var res = await wxrequest({
        url: `${this.url}${this.type}?${this.apikey}&start=${
          this.start
        }&count=${this.count}`,
        header: {
          "content-type": "json"
        }
      });
      console.log(res);
      let { statusCode, data } = res;
      if (statusCode === 200) {
        data.subjects.forEach(item => {
          // 添加星星数
          item.start = Math.round(item.rating.average / 2);
          // 分类保留一位小数
          item.rating.average = item.rating.average.toFixed(1);
        });
        this.dataList = [...this.dataList, ...data.subjects];
        console.log(this.dataList);
        // 关闭下拉背景
        wx.stopPullDownRefresh();
        // 关闭小菊花
        wx.hideNavigationBarLoading();
      }
    }
  },
  onLoad(options) {
    this.start = 0;
    this.count = 9;
    this.dataList = [];
    this.type = options.type;
    switch (this.type) {
      case "in_theaters":
        this.title = "影院热映";
        break;
      case "top250":
        this.title = "top250";
        break;
      case "coming_soon":
        this.title = "即将上映";
        break;
    }
    this.getDataList();
  },
  // 上拉触底事件
  onReachBottom() {
    // 请求下一页的数据
    // 修改开始数据
    this.start += this.count;
    console.log(this.start);
    // 重新请求数据源
    this.getDataList();
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    // 将原始数据清空
    this.start = 0;
    this.count = 9;
    this.dataList = [];
    // 重新请求数据
    this.getDataList();
  }
};
</script>

<style scoped lang="less">
.content {
  padding: 44rpx;
  h1 {
    font-size: 24px;
  }
  .imgList {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 33.333%;
      margin-top: 60rpx;
      text-align: center;
      img {
        width: 186rpx;
        height: 260rpx;
      }
      .name {
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        font-size: 16px;
        span {
          display: inline-block;
          width: 20rpx;
          height: 20rpx;
          background-size: 100%;
        }
        .start1 {
          background-image: url(../../utils/imgs/start1.png);
        }
        .start2 {
          background-image: url(../../utils/imgs/start2.png);
        }
      }
    }
  }
}
</style>
