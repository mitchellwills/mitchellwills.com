angular.module('home', ['ngRoute', 'ngAnimate', 'angulartics', 'angulartics.google.analytics'])
    .config(function($routeProvider, $locationProvider, $rootScopeProvider) {
    	$locationProvider.html5Mode(true).hashPrefix('!');
    	$routeProvider.when('/', {
    		templateUrl: '/views/main.html',
    		controller: 'MainCtrl',
    		tab: 'main',
    	});
    	$routeProvider.when('/education', {
    		templateUrl: '/views/education.html',
    		controller: 'EducationCtrl',
    		tab: 'education',
    	});
    	$routeProvider.when('/experience', {
    		templateUrl: '/views/experience.html',
    		controller: 'ExperienceCtrl',
    		tab: 'experience',
    	});
    	$routeProvider.when('/projects', {
    		templateUrl: '/views/projects.html',
    		controller: 'ProjectsCtrl',
    		tab: 'projects',
    	});
    	$routeProvider.when('/project/:projectId', {
    		templateUrl: '/views/project.html',
    		controller: 'ProjectCtrl',
    		tab: 'projects',
    	});
    	$routeProvider.otherwise({
    		templateUrl: '/views/404.html',
    	});
    })
    .controller('NavCtrl', ['$scope', '$route', 'ProfileService', function($scope, $route, ProfileService){
    	$scope.nav = [
    	{
    		display: "Education",
    		link: "/education",
    		name: 'education',
    	},
    	{
    		display: "Experience",
    		link: "/experience",
    		name: 'experience',
    	},
    	{
    		display: "Projects",
    		link: "/projects",
    		name: 'projects',
    	},
    	];
    	$scope.$route = $route;
    	$scope.closeNav = function(){
    		if($("#navbar-collapse-button").css('display') !== 'none')
    			$('#navbar-collapse').collapse('hide');
    	};
    	$scope.profiles = ProfileService.profiles;
    }])
    .controller('MainCtrl', ['$scope', function($scope){
    }])
    .controller('EducationCtrl', ['$scope', function($scope){
	
    }])
    .controller('ExperienceCtrl', ['$scope', 'ExperienceService', 'ProjectService', function($scope, ExperienceService, ProjectService){
    	$scope.ProjectService = ProjectService;
    	$scope.work = ExperienceService.work;
    	$scope.skills = ExperienceService.skills;
    	$scope.hover = {item: null, clicked: false};
    	$scope.hoverItem = function(item){
    		if(!$scope.hover.clicked)
    			$scope.hover.item = item;
    	};
    	$scope.clickItem = function(item){
    		if($scope.hover.item == item){
    			$scope.hover.clicked = !$scope.hover.clicked;
    		}
    		else{
    			$scope.hover.clicked = true;
    			$scope.hover.item = item; 
    		}
    	};
    	$scope.unhoverItem = function(){
    		if(!$scope.hover.clicked)
    			$scope.hover.item = null;
    	};
    }])
    .controller('ProjectsCtrl', ['$scope', 'ProjectService', '$location', '$route', function($scope, ProjectService, $location, $route){
    	$scope.projects = ProjectService.projects;
    	$scope.ProjectService = ProjectService;
	}])
    .controller('ProjectCtrl', ['$scope', 'ProjectService', '$location', '$route', '$analytics', function($scope, ProjectService, $location, $route, $analytics){
    	$scope.project = ProjectService.projectFromId($route.current.params.projectId);
    	$scope.mediaThumbnail = function(media){
    		if(media.type=='image')
    			return media.image;
    		else if(media.type='youtube')
    			return 'http://img.youtube.com/vi/'+media.youtubeId+'/mqdefault.jpg';
    	};
    	function createFancyBoxData(){
    		var data = new Array();
    		for(i in $scope.project.media){
    			var media = $scope.project.media[i];
    			var mediaData = {
    				title : media.label,
    				thumbnail: $scope.mediaThumbnail(media),
    			};
    			if(media.type=='image')
    				$.extend(mediaData, {href : media.image});
    			else if(media.type='youtube')
    				$.extend(mediaData, {href : "http://www.youtube.com/embed/"+media.youtubeId+"?autoplay=1&autohide=1&fs=1&rel=0&hd=1&wmode=opaque&enablejsapi=1", type: 'iframe'});
    			data.push(mediaData);
    		}
    		return data;
    	}

    	$scope.selectMedia = function(media){
    		$analytics.eventTrack('thumbnailClick', {  category: 'viewProjectMedia', label: media.label });
    		$.fancybox.open(createFancyBoxData(), {
    			padding: 0,
    			nextEffect  : 'fade',
    			prevEffect  : 'fade',
				theme: 'light',
    			index : $scope.project.media.indexOf(media),
    			helpers : {
    				thumbs : true,
    			},
    		});
    	};

    }])






    .service('ProjectService', ['$location', function($location){
    	var projects = [
    	{
    		id: "RBE1001",
    		title: "RBE 1001",
    		subtitle: "Robotics Class at WPI",
    		description: "A robot designed to pickup and score medals",
    		image: "content/rbe1001.jpg",
    		media: [
    		{
    			type: 'youtube',
    			youtubeId: "aGn3SdRKeWA",
    			label: "Test",
    		},
    		{
    			type: 'image',
    			image: "https://lh4.googleusercontent.com/-95HFAllagLU/TuMKC8qpjpI/AAAAAAAAA18/_YrObXVMI5c/s0-I/IMG_20111210_015900.jpg",
    			label: "Test2",
    		},
    		{
    			type: 'image',
    			image: "https://lh4.googleusercontent.com/-yeIriS2sfqY/TuZnjAx9KAI/AAAAAAAAA18/utqDIBjrizs/s0-I/IMG_20111212_151703.jpg",
    			label: "Test2",
    		},
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["Java", "DyIO"],
    		},
    		],
    	},
    	{
    		id: "RBE2001",
    		title: "RBE 2001",
    		subtitle: "Robotics Class at WPI",
    		description: 'A robot designed to remove and replace nuclear fuel rods',
    		image: "content/rbe2001.jpg",
    		media: [
    		{
    			type: 'youtube',
    			youtubeId: "6Ig5zaXRn_U",
    			label: "A video of the robot in action",
    		},
    		{
    			type: 'image',
    			image: "content/rbe2001.jpg",
    			label: "A side view of the robot",
    		},
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C++", "VEX"],
    		},
    		{
    			label: "Platform",
    			value: "Arduino",
    		},
    		],
    	},
    	{
    		id: "RBE3002",
    		title: "RBE 3002",
    		subtitle: "Robotics Class at WPI",
    		description: 'A robot designed to autonomously navigate a field of obstacles',
    		image: "http://www.willowgarage.com/sites/default/files/robots_turtlebot/TurtleBot-Front-640w.png",
    		media: [
    		{
    			type: 'youtube',
    			youtubeId: "FZXB38EeMqo",
    			label: "Test",
    		},
    		{
    			type: 'youtube',
    			youtubeId: "WuImTcW-fY0",
    			label: "Test",
    		},
    		{
    			type: 'image',
    			image: "content/rbe3002.jpg",
    			label: "Timelapse of our final run",
    		},
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["ROS", "C++"],
    		},
    		{
    			label: "Platform",
    			value: "Linux",
    		},
    		],
    	},
    	{
    		id: "AERO",
    		title: "AERO",
    		subtitle: "Autonomous Exploration Rover",
    		image: "http://lh4.googleusercontent.com/-NJw8ENX9_ZM/Ug00fPKyi9I/AAAAAAAAAU8/sfdt477LsN4/20130815_150514.jpg?imgmax=640",
    		media: [
    		{
    			type: 'image',
    			image: "http://lh4.googleusercontent.com/-NJw8ENX9_ZM/Ug00fPKyi9I/AAAAAAAAAU8/sfdt477LsN4/20130815_150514.jpg?imgmax=640",
    			label: "Test",
    		},
    		],
    		links: [
    		{
    			label: 'Team Website',
    			url: 'http://robot.wpi.edu/rover/',
    		}
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["ROS", "C++", "Python", "Arduino", "Device Drivers"],
    		},
    		{
    			label: "Platform",
    			value: "Linux",
    		},
    		],
    	},
    	{
    		id: "WeeCoder",
    		title: "WeeCoder",
    		subtitle: "A Windows 8 App",
    		image: "content/weecoder.png",
    		media: [
    		],
    		links: [
    		{
    			label: 'View in Windows Store',
    			url: 'http://apps.microsoft.com/windows/en-us/app/weecoder/00d00115-5b65-4269-92e0-368c6a889940',
    		}
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C#", "XAML"],
    		},
    		{
    			label: "Platform",
    			value: "Windows 8.1",
    		},
    		],
    	},
    	{
    		id: "NetworkTables",
    		title: "Network Tables",
    		subtitle: "FIRST Robotics Library",
    		color: '#B22222',
    		media: [
    		],
    		links: [
    		{
    			label: 'Source Code',
    			url: 'https://usfirst.collab.net/sf/projects/networktables/',
    		}
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C++", "Java"],
    		},
    		{
    			label: "Platforms",
    			values: ["cRIO", "Desktop"],
    		},
    		],
    	},
    	{
    		id: "AlwaysOn",
    		title: "Always On",
    		fullTitle: "Always On Relational Agents for Social Support of Isolated Older Adults",
    		subtitle: "Agent for Isolated Adults",
    		color: '#AFEEEE',
    		media: [
    		],
    		links: [
    		{
    			label: 'Project Page',
    			url: 'http://web.cs.wpi.edu/~rich/always/',
    		}
    		],
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C#", "XAML"],
    		},
    		],
    	},
    ];

    function navToProject(project){
    	if(!project)
    		return;
    	if(project.url)
    		window.location.href = project.url;
    	else
    		$location.path("/project/"+project.id);
    };

    function projectBackgroundStyle(project){
    	if(!project)
    		return;
    	var style = "";
    	if(project.color)
    		style += " "+project.color;
    	if(project.image)
    		style += " url('"+project.image+"')";
    	return style;
    };

	return {
	    projects: projects,
	    navToProject: navToProject,
	    projectBackgroundStyle: projectBackgroundStyle,
	    projectFromId: function(id){
		for(i in projects){
		    var project = projects[i];
		    if(project.id==id)
			return project;
		}
	    }
	};
    }])
    .service('ExperienceService', function(){
    	var work = [
    	{
    		company: "WPI FIRST Robotics Library",
    		companyLink: "http://usfirst.collab.net",
    		title: "Software Developer",
    		location: "Worcester, MA",
    		date: "September 2011 – Present",
    		properties: [
    		{
    			label: "Technologies",
    			values: ["Java", "C++"],
    		}
    		],
    		descriptions: [
    		"Developed programming libraries for thousands of high school students",
    		"Developed cross-language, table-based communication library",
    		"Implemented distributed testing framework",
    		"Improved continuous integration build process",
    		],
    		projectIds: ["NetworkTables",],
    	},
    	{
    		company: "Microsoft",
    		companyLink: "http://microsoft.com",
    		title: "Foundry Developer Intern",
    		location: "Cambridge, MA",
    		date: "June 2013 – August 2013",
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C#", "XAML", "WinRT"],
    		}
    		],
    		descriptions: [
    		"Developed Windows 8 game (WeeCoder) to teach programming to young children",
    		"Participated in entire software development process from design to testing",
    		],
    		projectIds: ["WeeCoder",],
    	},
    	{
    		company: "WPI Interactions Lab",
    		companyLink: "http://web.cs.wpi.edu/~rich/hri/",
    		title: "Research Assistant",
    		location: "Worcester, MA",
    		date: "May 2012 – August 2012",
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C#", "XAML"],
    		}
    		],
    		descriptions: [
    		"Always On Project",
    		"Implemented calendaring API",
    		"Developed ontologies for storing user data",
    		"Developed a Virtual Human Agent",
    		],
    		projectIds: ["AlwaysOn",],
    	},
    	{
    		company: "MITRE",
    		companyLink: "http://mitre.org",
    		title: "Summer Intern",
    		location: "Bedford, MA",
    		date: "June 2011 – August 2011",
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C", "C++"],
    		}
    		],
    		descriptions: [
    		"Developed tests for software security software",
    		"Participated in software security capture the flag event",
    		],
    	},
    	{
    		company: "Boston Museum of Science",
    		companyLink: "http://mos.org",
    		title: "Volunteer",
    		location: "Boston, MA",
    		date: "June 2010 – August 2011",
    		descriptions: [
    		"Educated visitors of the museum",
    		"Aided in day-to-day operation of Cahners ComputerPlace",
    		],
    	},
    	{
    		company: "Azuki Systems",
    		companyLink: "http://www.azukisystems.com/",
    		title: "Summer Intern",
    		location: "Acton, MA",
    		date: "June 2010 – August 2010",
    		properties: [
    		{
    			label: "Technologies",
    			values: ["C++", "Java", "Android"],
    		}
    		],
    		descriptions: [
    		"Investigated application security on mobile devices",
    		"Ported libraries to multiple languages",
    		],
    	},
    	];
    	var skills = [
    	{
    		title: "Fluent Programming Languages",
    		items: ["Java", "C", "C++", "C#", "XAML", "Javascript"],
    	},
    	{
    		title: "Familiar With",
    		items: ["Python", "Racket (LISP)", "Bash"],
    	},
    	{
    		title: "Applications",
    		items: ["Eclipse", "NetBeans", "Visual Studio", "Microsoft Office", "SolidWorks"],
    	},
    	{
    		title: "Platforms",
    		items: ["Windows", "Linux", "Embedded Systems", "ROS (Robot Operating System)", "Web"],
    	},
    	];
    	return {
    		work: work,
    		skills: skills,
    	};
    })
    .service('ProfileService', function(){
    	var profiles = [
    	{
    		title: "Linkedin",
    		url: "http://www.linkedin.com/in/mitchellwills/",
    		iconClass: "fa fa-linkedin-square fa-lg fa-fw",
    		color: "#007bb6",
    	},
    	{
    		title: "Google+",
    		url: "http://plus.google.com/+MitchellWills",
    		iconClass: "fa fa-google-plus-square fa-lg fa-fw",
    		color: "#dd4b39",
    	},
    	{
    		title: "Facebook",
    		url: "http://www.facebook.com/mitchellewills",
    		iconClass: "fa fa-facebook-square fa-lg fa-fw",
    		color: "#3b5998",
    	},
    	{
    		title: "Github Profile",
    		url: "http://github.com/mitchellweb1",
    		iconClass: "fa fa-github fa-lg fa-fw",
    	},
    	];
	return {
	    profiles: profiles,
	};
    })
    .directive('tile', function() {
    	return {
    		restrict: 'E',
    		scope: {
    			contentBackground: '@',
    			label: '@',
    			sublabel: '@',
    		},
    		transclude: true,
    		replace: true,
    		template: '<div class="tile no-select">'+
    		'<div class="tile-content" style="background: {{contentBackground}};background-size: cover;background-repeat: no-repeat;background-position: 50% 50%;" ng-transclude>'+
    		'</div>'+
    		'<div class="tile-label">'+
    		'<div>{{label}}</div>'+
    		'<div class="tile-label-sub">{{sublabel}}</div>'+
    		'</div>'+
    		'</div>',
    	};
    });
