// build time:Mon Dec 17 2018 09:16:42 GMT+0800 (中国标准时间)
$(document).ready(function(){$(document).trigger("bootstrap:before"),NexT.utils.isMobile()&&window.FastClick.attach(document.body),NexT.utils.lazyLoadPostsImages(),NexT.utils.registerESCKeyEvent(),NexT.utils.registerBackToTop(),$(".site-nav-toggle button").on("click",function(){var e=$(".site-nav"),t=e.hasClass("site-nav-on"),o=t?"slideUp":"slideDown",i=t?"removeClass":"addClass";e.stop()[o]("fast",function(){e[i]("site-nav-on")})}),CONFIG.fancybox&&NexT.utils.wrapImageWithFancyBox(),CONFIG.tabs&&NexT.utils.registerTabsTag(),NexT.utils.embeddedVideoTransformer(),NexT.utils.addActiveClassToMenuItem(),NexT.motion.integrator.add(NexT.motion.middleWares.logo).add(NexT.motion.middleWares.menu).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar),$(document).trigger("motion:before"),CONFIG.motion.enable&&NexT.motion.integrator.bootstrap(),$(document).trigger("bootstrap:after")});
//rebuild by neat 