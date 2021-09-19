import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardArrs: [
      {
        text: "card-0",
        zIndex: 11,
        bgColor: "red",
        url: require("../assets/img/index.jpg"),
        scale: 1,
        translateY: 0,
        transitionTime: 1,
        Id: "index",
        noQ: true
      },
      {
        // todo 资料页面
        text: "card-1",
        zIndex: 10,
        bgColor: "red",
        url: require("../assets/img/index.jpg"),
        scale: 0.95,
        translateY: 0,
        transitionTime: 1,
        Id: "profile",
        noQ: true
      },
      {
        text: "card-2",
        zIndex: 9,
        bgColor: "blue",
        url: require("../assets/img/q1.jpg"),
        scale: 0.9,
        translateY: "9vh",
        transitionTime: 1,
        title: "Q1",
        components: [
          {
            img: require("../assets/img/phone.png"),
            name: 'phone'
          }
        ],
        context:
          "铃声响起，你觉得脸上痒痒的，好像有猫咪在舔你. 睁开眼睛，发现你的手机长出了舌头！ 你会....",
        Choices: [
          {
            label: "立马扔掉手机，起床仔细研究",
            value: "A1",
          },
          {
            label: "震惊以后以为自己在做梦，继续睡",
            value: "A2",
          },
        ]
      },
      {
        text: "card-3",
        zIndex: 8,
        bgColor: "yellow",
        scale: 0.85,
        url: require("../assets/img/q2.jpg"),
        translateY: "14vh",
        transitionTime: 1,
        title: "Q2",
        context:
          "出门以后,滑轮四周的树居然都变得光秃秃，只有几朵巨大艳丽得花，所有生物得大小彷佛都颠倒了······一直巨大得诺丁鸭朝你走来，你会",
        Choices: [
          {
            label: "觉得很神奇，远远地和它合照就好",
            value: "a1",
          },
          {
            label: "好奇的上前，尝试和诺丁鸭搭讪",
            value: "b1",
          },
        ]
      },
      {
        text: "card-4",
        zIndex: 7,
        bgColor: "green",
        url: require("../assets/imgs/q3.jpeg"),
        scale: 0.5,
        translateY: "40vh",
        transitionTime: 1,
        title: "Q3",
        context:
          "走过诺丁桥，你看到一个美丽得魔女，但她并没有发现你,一个人坐在图书馆门外草坪。你会：",
        Choices: [
          {
            label: "鼓起勇气，尝试向她询问发生了什么",
            value: "B1",
          },
          {
            label: "默默走开，等她发现你之前，现自己探索",
            value: "B2",
          },
        ],
      },
      {
        text: "card-5",
        zIndex: 6,
        bgColor: "gray",
        url: require("../assets/img/q4.jpg"),
        scale: 0.5,
        translateY: "40vh",
        transitionTime: 0,
        title: "Q4",
        components: [
          {
            img: require("../assets/img/monv.png"),
            name: 'monv'
          }, {
            img: require("../assets/img/student.png"),
            name: 'student'
          }],
        context:
          "魔女与你交谈，他告诉你，这个世界所有事物都混乱了，意味着你不再是学生，可以做自己想做的任何事。你会：",
        Choices: [
          {
            label: "感到有点兴奋",
            value: "b1",
          },
          {
            label: "感到有点不安",
            value: "b2",
          },
        ],
      },
      {
        text: "card-6",
        zIndex: 5,
        bgColor: "pink",
        url: require("../assets/img/q5.jpg"),
        scale: 0.5,
        translateY: "40vh",
        transitionTime: 0,
        title: "Q5",
        components: [
          {
            img: require("../assets/img/F1.png"),
            name: 'F1'
          }, {
            img: require("../assets/img/F2.png"),
            name: 'F2'
          },
          {
            img: require("../assets/img/F3.png"),
            name: 'F3'
          }, {
            img: require("../assets/img/F4.png"),
            name: 'F4'
          }, {
            img: require("../assets/img/F5.png"),
            name: 'F5'
          }, {
            img: require("../assets/img/F6.png"),
            name: 'F6'
          }
        ],
        context:
          "进入了图书馆，发现空气中漂浮着各种各样的人物职业形象气泡，你好奇地伸手触碰，一阵神奇的 力量涌入了你的身体：你拥有了匹配的技能！但同时，一阵困倦感袭来，你会：",
        Choices: [
          {
            label: "尽量多触碰几个气泡，这样的机会可不多",
            value: "C1",
          },
          {
            label: "还是要谨慎一点，这事不着急，小命更重要",
            value: "C2",
          },
        ],
      },
      {
        text: "card-7",
        zIndex: 4,
        bgColor: "purple",
        scale: 0.5,
        url: require("../assets/img/q6.jpg"),
        translateY: "40vh",
        transitionTime: 0,
        title: "Q6",
        components:[
          {
            img: require("../assets/img/jingzi.png"),
            name: 'mojing'
          }
        ],
        context:
          "在一个房间内，你看到了一面魔镜。它对你说：你有一次机会，可以在里面看到 10 年后的自己，但 要注意的是：如果你心里不确定自己会变成什么样，可能会被未来吞噬……你选择：",
        Choices: [
          {
            label: "已经有模糊的方向，可以一试",
            value: "c1",
          },
          {
            label: "没有较确定的猜想，还是不看了",
            value: "c2",
          },
        ],
      },
    ],
  },
  mutations: {
    increment: (state, data) => {
      state.count++;
    },
    changeCurrentChoice: (state, data) => {
      console.log(data)
      const { index, choice } = data
      const obj = { ...state.cardArrs[index], currentChoice: choice }
      console.log(obj, '3444', state.cardArrs)
      state.cardArrs.splice(index, 1, obj)
    }
  },
  getters: {
    // user
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    loginStatus: state => state.user.loginStatus,
    getCurrentChoiceByIndex: (state) => (index) => {
      return state.cardArrs[index].currentChoice
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  modules: {
    app,
    user
  }
})
