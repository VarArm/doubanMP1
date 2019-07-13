<template>
  <div class="content">
    <!-- 电影列表 -->
    <div class="list">
      <div class="title">
        <div class="name">影院热映</div>
        <div class="more">
          <a href="/pages/more/main?type=in_theaters">更多</a>
        </div>
      </div>
      <div class="mybox">
        <scroll-view scroll-x class="myscroll">
          <div class="item" v-for="(item, index) in movieList" :key="index">
            <img :src="item.images.small" alt />
            <div class="moviename">{{ item.title }}</div>
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
                <!-- <span class="start1"></span>
                                            <span class="start1"></span>
                                            <span class="start2"></span>
                <span class="start2"></span>-->
                <span class="word">{{ item.rating.average }}</span>
              </div>
              <div v-else>暂无评分</div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- top250 -->
    <div class="list">
      <div class="title">
        <div class="name">影院热映</div>
        <div class="more">
          <a href="/pages/more/main?type=top250">更多</a>
        </div>
      </div>
      <div class="mybox">
        <scroll-view scroll-x class="myscroll">
          <div class="item" v-for="(item, index) in top250List" :key="index">
            <img :src="item.images.small" alt />
            <div class="moviename">{{ item.title }}</div>
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
                <!-- <span class="start1"></span>
                                            <span class="start1"></span>
                                            <span class="start2"></span>
                <span class="start2"></span>-->
                <span class="word">{{ item.rating.average }}</span>
              </div>
              <div v-else>暂无评分</div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
    <!-- 即将上映 -->
    <div class="list">
      <div class="title">
        <div class="name">影院热映</div>
        <div class="more">
          <a href="/pages/more/main?type=coming_soon">更多</a>
        </div>
      </div>
      <div class="mybox">
        <scroll-view scroll-x class="myscroll">
          <div class="item" v-for="(item, index) in commonSoon" :key="index">
            <img :src="item.images.small" alt />
            <div class="moviename">{{ item.title }}</div>
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
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import wxrequest from "../../utils/js/wxrequest.js";
export default {
  data() {
    return {
      movieList: [],
      top250List: [],
      // 即将上映
      commonSoon: []
    };
  },
  methods: {
    async getMovieList() {
      var res = await wxrequest({
        url:
          "https://autumnfish.cn/v2/movie/in_theaters?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
        method: "get",
        header: {
          "content-type": "json"
        }
      });

      let { statusCode, data } = res;
      // 判断
      if (statusCode === 200) {
        // 得到数据之前将星星数据计算出来
        data.subjects.forEach(item => {
          // 得到星星数
          var startNum = Math.round(item.rating.average / 2);
          item.start = startNum;
          item.rating.average = item.rating.average.toFixed(1);
        });
        this.movieList = data.subjects;
      }
    },
    async getTop250List() {
      var res = await wxrequest({
        url:
          "https://autumnfish.cn/v2/movie/top250?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
        method: "get",
        header: {
          "content-type": "json"
        }
      });

      let { statusCode, data } = res;
      // 判断
      if (statusCode === 200) {
        // 得到数据之前将星星数据计算出来
        data.subjects.forEach(item => {
          // 得到星星数
          var startNum = Math.round(item.rating.average / 2);
          item.start = startNum;
          item.rating.average = item.rating.average.toFixed(1);
        });
        this.top250List = data.subjects;
      }
      console.log(this.top250List);
    },
    async getCommonSoon() {
      var res = await wxrequest({
        url:
          "https://autumnfish.cn/v2/movie/coming_soon?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
        method: "get",
        header: {
          "content-type": "json"
        }
      });

      let { statusCode, data } = res;
      // 判断
      if (statusCode === 200) {
        // 得到数据之前将星星数据计算出来
        data.subjects.forEach(item => {
          // 得到星星数
          var startNum = Math.round(item.rating.average / 2);
          item.start = startNum;
          item.rating.average = item.rating.average.toFixed(1);
        });
        this.commonSoon = data.subjects;
      }
    }
  },
  created() {
    this.getMovieList();
    this.getTop250List();
    this.getCommonSoon();
    // 2.0--------------------------------
    // var wxpromise = wxrequest({
    //   url:
    //     "https://autumnfish.cn/v2/movie/in_theaters?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
    //   method: "get",
    //   header: {
    //     "content-type": "json"
    //   }
    // });
    // wxpromise.then(res => {
    //   let { statusCode, data } = res;
    //   // 判断
    //   if (statusCode === 200) {
    //     // 得到数据之前将星星数据计算出来
    //     data.subjects.forEach(item => {
    //       // 得到星星数
    //       var startNum = Math.round(item.rating.average / 2);
    //       item.start = startNum;
    //       item.rating.average = item.rating.average.toFixed(1);
    //     });
    //     this.movieList = data.subjects;
    //   }
    //   console.log(this.movieList);
    // });
    // 1.0--------------------------------------------------
    // wx.request({
    //   url:
    //     "https://autumnfish.cn/v2/movie/in_theaters?q=undefined&apikey=0df993c66c0c636e29ecbb5344252a4a",
    //   data: {},
    //   header: {
    //     "content-type": "json"
    //   },
    //   success: res => {
    //     console.log(res);
    //   }
    // });
  }
};
</script>

<style scoped lang='less'>
.content {
  .list {
    .title {
      display: flex;
      justify-content: space-between;
      padding: 0px 36rpx;
      height: 98rpx;
      line-height: 98rpx;
      .name {
        font-size: 20px;
      }
      .more {
        color: #42bd56;
      }
    }
    .mybox {
      overflow: hidden;
      white-space: nowrap;
      .myscroll {
        width: auto;
        overflow: hidden;
        .item {
          display: inline-block;
          text-align: center;
          margin-right: 10px;
          img {
            width: 200rpx;
            height: 285rpx;
          }
          .moviename {
            font-size: 16px;
            width: 200rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .score {
            span {
              display: inline-block;
              width: 14px;
              height: 14px;
              background-size: 100%;
            }
            .start1 {
              background-image: url(../../utils/imgs/start1.png);
            }
            .start2 {
              background-image: url(../../utils/imgs/start2.png);
            }
            font-size: 16px;
            .word {
              width: 28px;
            }
          }
          &:first-child {
            margin-left: 36rpx;
          }
          &:last-child {
            margin-right: 36rpx;
          }
        }
      }
    }
  }
}
</style>
