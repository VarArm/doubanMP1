<template>
  <div class="content">
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
</template>

<script>
import wxrequest from "../../utils/js/wxrequest.js";
export default {
  data() {
    return {
      movieList: []
    };
  },
  async created() {
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
    console.log(this.movieList);

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
</style>
