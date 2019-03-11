<template>
  <div class="container">
    <div class="chooseBox">
      <input type="text" @click="showMonthBox" v-model="currentYM" readonly class="input">
      <div class="monthBox" v-show="monthBoxFlag">
        <div class="header">
          <span class="preYear" @click="currentY--"><i><</i></span>
          <span class="currentY">{{currentY}}</span>
          <span class="nextYear" @click="currentY++"><i>></i></span>
        </div>
        <div class="main">
          <ul>
            <template v-for="(item, index) in month">
              <li class="month" @mousedown="chooseMonth(index)">{{item}} 月</li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="calendarBox">
      <table>
        <tr><th v-for="item in week">{{item}}</th></tr>
        <tr v-for="weeks in dateData">
          <template v-for="days in weeks">
            <!--上月-->
            <td :style="{visibility : days.currentMonthFlag ? 'visible' : 'hidden'}">
              <div class="withoutWork" v-show="days.workList.length == 0">
                {{days.dayNum}}
              </div>
              <div class="withWork" v-if="days.workList.length != 0">
                <span>{{days.dayNum}}</span>
                <div class="work">
                  <img @click="checkWork(days.workList[0].id)" :src="days.workList[0].cover" alt="作品封面" class="cover">
                  <p @click="checkWork(days.workList[0].id)">{{days.workList[0].title}}</p>
                  <i class="el-icon-delete" @click="deleteWork(days.workList, 0)" v-if="!visitorFlag"></i>
                </div>
                <i class="el-icon-more" @click="showOtherWork(days)"></i>
                <div class="otherWorkBox" v-if="days.otherWorkFlag">
                  <table>
                    <tr>
                      <td v-for="(item,index) in days.workList">
                        <div class="work">
                          <img @click="checkWork(item.id)" :src="item.cover" alt="作品封面" class="cover">
                          <p @click="checkWork(item.id)">{{item.title}}</p>
                          <i class="el-icon-delete" @click="deleteWork(days.workList, index)" v-if="!visitorFlag"></i>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        deleteWorkId: '',
        monthBoxFlag: true,
        currentYM: '',
        currentY: 2019,
        currentM: 2,
        month:[1,2,3,4,5,6,7,8,9,10,11,12],
        week: ['日','一','二','三','四','五','六'],
        dateData: [],
        workData: []
      }
    },
    props:{
      visitorFlag:{
        type:Boolean,
        required: true
      },
      userId:{
        type:String,
        required:true
      }
    },
    methods:{
      // 查看作品
      checkWork:function(id){
        this.$router.push({path: '/detail', name: 'detail', query: {id: id}});
      },
      showOtherWork:function(day){
        day.otherWorkFlag = !day.otherWorkFlag;
      },
      deleteWork:function(workList, index){
        let self = this;
        this.$confirm('确认删除此作品', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$axios({
            method: 'delete',
            baseURL:self.domainName,
            url: '/work/' + workList[index].id
          }).then(function (res) {
            workList.splice(index,1);
          }).catch(function (err) {
            self.$message({
              type: 'info',
              message: '删除失败'
            });
          })
        })
      },
      showMonthBox:function () {
        this.monthBoxFlag = !this.monthBoxFlag;
      },
      chooseMonth:function (index) {
        let month = index;//减一后的月份
        let year = this.currentY;
        this.currentYM = year + "年" + " " + (month + 1) + "月";
        //获取发布记录数据
        this.getData(year, month);
      },
      getMonthDays:function (year, month/* 一月对应0*/) {//获取该月份的天数
        return new Date(year, month+1, 0).getDate();
      },
      getMonthWeeks:function (currentMonthDays, firstDayInWeek) {//获取该月共有星期数
        return Math.ceil((currentMonthDays+firstDayInWeek)/7);
      },
      initCalendar: function(year, month){
        let i,j;
        let dateData = [];
        let workData = [];
        this.workData.forEach(function (v,i) {
          if (workData[v.dayNum] == undefined){
            workData[v.dayNum] = [];
            workData[v.dayNum].push(v);
          }else{
            workData[v.dayNum].push(v);
          }
        });
        let currentMonth = new Date(year, month);
        let preMonthDays = this.getMonthDays(year, month-1);//获取上个月的天数
        let currentMonthDays = this.getMonthDays(year, month);//获取本月的天数
        let firstDayInWeek = currentMonth.getDay();
        let monthWeeks = this.getMonthWeeks(currentMonthDays, firstDayInWeek);
        // 初始化上个月的排列
        for (i=0, dateData[0] = []; i<firstDayInWeek; i++){
          dateData[0].push({
            dayNum: preMonthDays - firstDayInWeek + 1 + i,
            currentMonthFlag: false,
            workList: []
          })
        }
        // 初始化这个月的排列
        for (i=1,j=0; i<=currentMonthDays; i++){
          if (Math.floor((firstDayInWeek + i -1) / 7) > j){
            dateData[++j]=[];
          }
          dateData[j].push({
            dayNum: i,
            currentMonthFlag: true,
            workList: workData[i] || [],
            otherWorkFlag: false
          });
        }
        //初始化下个月的排列
        this.dateData = dateData;//赋值
        this.showMonthBox();//隐藏月份框
      },
      getData:function (year, month) {
        let self = this;
        this.$axios({
          method: 'get',
          baseURL: self.domainName,
          url: '/profile/publishRecord',
          params:{
            year: year,
            month: month+1,
            day:'',
            userId: self.userId,
          }
        }).then(function (res) {
          let originalData = res.data.data;
          if (!originalData)return;
          self.workData = originalData.map(function (v) {
            return {
              dayNum: new Date(v.publishTime).getDate(),
              id: v.id,
              title: v.title,
              cover: v.cover
            };
          });
        }).catch(function (err) {
          self.$message('获取发布记录失败');
        }).finally(function () {
          self.initCalendar(year, month);
        })
      }
    },
    created(){
      // this.userId = JSON.parse(this.getCookie('userData')).id;
      // console.log(this.userId);
      let current = new Date();
      let month = current.getMonth();
      let year = current.getFullYear();
      this.chooseMonth(month);
    },
    deactivated() {
      this.$destroy();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chooseBox{
    position: relative;
    text-align: left;
  }
  .input{
    outline: none;
    border: none;
    width: 140px;
    height: 32px;
    border-radius: 5px;
    line-height: 32px;
    background: #fff;
    padding: 0 10px;
    font-size: 14px;
  }
  .monthBox{
    position: absolute;
    width: 280px;
    height: 280px;
    margin-top: 6px;
    background: #fff;
    border-radius: 10px;
  }
  .monthBox .header{
    height: 39px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  .preYear, .nextYear, .currentY{
    display: inline-block;
    height: 100%;
  }
  .currentY{ width: 50% ; line-height: 39px;}
  .preYear, .nextYear{ width: 20% ;}
  .preYear i,.nextYear i{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    line-height: 22px;
  }
  .preYear i:hover, .nextYear i:hover{
    background: #4959F6;
    cursor: pointer;
    color: #fff;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .monthBox{
    z-index: 999;
  }
  .monthBox ul{
    list-style: none;
    padding: 20px 10px;
    overflow: hidden;
    zoom: 1;
  }
  .month{
    cursor: pointer;
    float: left;
    width: 33%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .month:hover{
    background: #4959F6;
    color: #fff;
  }
  .month .active{
    background: #4959F6;
    color: #fff;
  }
  .calendarBox table{
    width: 100%;
  }
  .calendarBox th{
    height: 60px;
    line-height: 60px;
  }
  .calendarBox td{
    height: 140px;
    width: 14%;
    text-align: center;
    vertical-align:middle;
    position: relative;
  }
  .withoutWork{
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #fff;
    text-align: center;
    line-height: 80px;
  }
  .withWork{
    display: inline-block;
  }
  .withWork span{
    display: inline-block;
    position: absolute;
    left: -10px;
    background: #c1c1c1;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    text-align: center;
    line-height: 24px;
  }
  .work{
    cursor: pointer;
    margin: 0 auto;
    width: 120px;
    height: 112px;
    border-radius: 10px;
    background: #fff;
    line-height: normal;
    overflow: hidden;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
  }
  .work .cover{
    width: 120px;
    height: 80px;
  }
  .work p{
    font-size: 14px;
    text-align: left;
    padding-left: 10px;
    height: 32px;
    line-height: 32px;
  }
  .el-icon-delete, .el-icon-more{
    cursor: pointer;
    position: absolute;
    display: inline-block;
    width: 24px;
    height: 16px;
  }
  .el-icon-more{
    border-radius: 50%;
    bottom: 20px;
    right: -10px;
  }
  .el-icon-delete{
    visibility: hidden;
    bottom: 25px;
    right: 25px;
    border-radius: 2px;
  }
  .work:hover .el-icon-delete{
    visibility: visible;
  }
  .el-icon-delete:hover, .el-icon-more:hover{
    background: #c1c1c1;
  }
  .otherWorkBox{
    z-index: 999;
    padding: 15px 5px;
    position: absolute;
    top: 120px;
    max-width: 700px;
    background: #fff;
    box-shadow: 0 0 8px #888;
    border-radius: 5px;
  }
  .otherWorkBox .work{
    position: relative;
    margin: 0 10px;
    width: 208px;
    height: 194px;
    box-shadow: 0 0 1px #888;
  }
  .otherWorkBox .work img{
    width: 100%;
    height: 148px;
  }
  .otherWorkBox .work p{
    height: 48px;
    line-height: 48px;
    border-top: 1px solid #eee;
  }
  .otherWorkBox .work .el-icon-delete{
    right: 10px;
    bottom: 15px;
  }
</style>
