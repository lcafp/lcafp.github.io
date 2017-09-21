window.onload = function(e) { 
  var router = new VueRouter({
      mode: 'history',
      routes: []
  });

  var app = new Vue({
    router,
    el: '#app',
    components: {
      'credits': httpVueLoader('./vendor/afp/credits.vue'),
      'logo': httpVueLoader('./vendor/afp/logo.vue'),
      'tabs': httpVueLoader('./tabs.vue')
    },
    data: {
      story: {}
    },
    created() {
    	const url = this.getStory(this.$route.query.lang);
      this.loadStory(url).then(json => {
        this.story = json;
      })
    },
    mounted() {
    	var pymChild = new pym.Child({ polling: 500 });
    },
    methods: {
    	getStory(lang) {
        if(lang && lang.length == 2) return './story_'+lang+'.txt';
        return './story_en.txt';
      },
      loadStory(url) {
        return this.$http.get(url)
          .then(response => archieml.load(response.bodyText));
      }
    }
  })
};