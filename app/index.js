'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var pathNames;

var YomodageGenerator = module.exports = function YomodageGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
	  skipInstall: options['skip-install'],
	  callback: function() {
		this.emit('dependenciesInstalled');
	  }.bind(this)
    });
  });

  this.on('dependenciesInstalled', function() {
      this.spawnCommand('grunt', ['build']);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
  pathNames = this.destinationRoot().split(path.sep);
};

util.inherits(YomodageGenerator, yeoman.generators.Base);

YomodageGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  {
	name : 'name',
	message : 'What would you like to name your template?',
	default : function(props) {
      return pathNames[pathNames.length-1];
	}
  },
  {
    name : 'description',
	message : 'How would you describe this manager theme?',
    default : 'The best MODX theme ever made!'
  },
  {
    type : 'confirm',
    name : 'useTpl',
    message : 'Would you like to start of with the default .tpl and image files?'
},
  {
	type : 'list',
    name : 'cssType',
    message : 'Choose a CSS pre-prepocessor',
    choices : ['Sass','LESS','None'],
    default: 'Sass'
  },
  {
	type:'confirm',
    name : 'modxSass',
	message : 'Since you chose Sass, would you like to start include the source Sass files of the default theme?',
    default : true,
    when : function(props) {
      return props.cssType == 'Sass';
    }
  },
  {
    name:'templateDir',
    message : 'What is the relative path to your template directory?',
    default:function(props) {
      return '../../../manager/templates/';
    }
  },
  {
    type:'confirm',
    name:'enterAuthor',
    message:'Would you like to enter some author and project related info?',
    default:true
},
  {
	name : 'authorName',
	message : 'Author name',
	default : '',
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'authorEmail',
	message : 'Author email',
	default : '',
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'authorUrl',
	message : 'Author url',
	default : '',
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'gitRepo',
	message : 'Project git repository',
	default : function(props) {
		return (props.enterAuthor && props.authorName) ? 'git://github.com/' + _s.slugify(props.authorName.replace(/ /g,'')) + '/' + _s.slugify(props.name) + '.git' : ''
	},
    when : function(props) {
      return props.enterAuthor;
    }
  },
  {
	name : 'gitIssues',
	message : 'Project issues tracker',
	default : function(props) {
		if(!props.gitRepo) return '';
		var _s = props.gitRepo;
		_s = _s.substring(0,_s.length-4);
		return _s.replace('git://','https://') + '/issues';
	},
    when : function(props) {
      return props.gitRepo && props.gitRepo.length > 0;
    }
  }
];

  this.prompt(prompts, function (props) {
    this.name = props.name;
	this.prefix = 'modx-';
    this.description = props.description;
    this.modxSass = props.modxSass;
    this.useTpl = props.useTpl;
	this.slug = _s.slugify(props.name);
    this.templateDir = (props.templateDir.slice(-1) == '/') ? props.templateDir : props.templateDir + '/';
    this.themeDir = this.templateDir + this.slug + '/';
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.authorUrl = props.authorUrl;
    this.gitRepo = props.gitRepo;
    this.gitIssues = props.gitIssues;

	switch(props.cssType.toLowerCase()[0]) {
		case 's':
		default:
		this.cssType = 'sass';
		break;
		
		case 'l':
		this.cssType = 'less';
		break;
		
		case 'n':
		case undefined:
		this.cssType = 'none';
		break;
	}
	
    cb();
  }.bind(this));
};

YomodageGenerator.prototype.app = function app() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  if(this.modxSass) {
	this.directory('sass','sass');

  } else if(this.cssType == 'sass' || this.cssType == 'less') {
	// just blank files either way
    this.mkdir(this.cssType);
	this.write(this.cssType + '/index.' + this.cssType,'');
	this.write(this.cssType + '/login.' + this.cssType,'');
  } 
  if(this.useTpl) {
    this.bulkDirectory('default',this.templateDir + this.slug);
  }
};

YomodageGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
