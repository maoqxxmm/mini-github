const github = require('../../api/github.js')
const computedBehavior = require('../../lib/computed.js')
const moment = require('../../lib/moment.js')

const theming = require('../../behaviours/theming.js')

Component({
  behaviors: [computedBehavior, theming],

  properties: {
    url: {
      type: String,
      value: 'https://api.github.com/repos/kezhenxu94/mini-github/issues/23'
    },
    thread: {
      type: Number,
      value: 0
    }
  },

  computed: {
    releaseDate () {
      return this.data.release && moment(this.data.release.published_at).fromNow()
    }
  },

  data: {
    release: undefined,
  },

  methods: {
    onLoad: function() {
      wx.startPullDownRefresh();
      this.data.thread && github.notifications().threads(this.data.thread).patch();
    },
    
    onPullDownRefresh: function() {
      github.getRelease(this.data.url).then(release => {
        wx.stopPullDownRefresh();
        this.setData({
          release
        })
      })
    }
  }
})