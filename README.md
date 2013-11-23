yomonger
========

[1]:http://yeoman.io/generators.html
[2]:https://github.com/modxcms/revolution/tree/develop/_build/templates/default#contribution-guides

![](http://j4p.us/image/0l1t1e453c2p/Screen%20Shot%202013-11-22%20at%2012.23.20%20AM.png)

Meet yomonger (yo-modx-manager), a friendly little monster that lives in your computer. He loves three things:
 * asking you a couple questions
 * bootstrapping your [MODX Manager theme][2]
 * being a [Yeoman generator][1] 


## Getting Started
The first thing we need to do, is make sure yomonger is happy. He is self consious about not being installed on every computer, but once he is setup on yours he is quickly satisfied.

From your terminal, run:

```bash
npm install -g yo generator-yomonger
```

Now that you've installed yo and generator-yomonger globally you can use it from within any directory. While yomonger can occupy any directory, he'd much prefer to be within a local MODX install so he knows his way around a bit. So if you have one, let's head there and make our own theme. We'll call it `custom-theme`.

#### Creating a Theme Directory
```bash
# go to wherever your MODX install is
cd ~/Sites/modx/revolution/
# make a template directory
mkdir manager/templates/custom-theme
```
_Note: Manually creating the theme directory is optional. Yomonger will take it upon himself if necessary, but he just wants to make sure you know where your stuff will wind up._

Great, that is where yomonger will assume he should create your project. Let's get him focused on the task at hand.

#### Creating a build directory

```bash
# go to wherever your MODX install is
cd ~/Sites/modx/revolution/
# make a build directory
cd _build/templates
mkdir custom-theme && cd $_
```

We are almost ready to let yomonger do his thing. But first, make note of your `manager/templates/custom-theme` directory relative to your build directory. It should be `../../../manager/templates/custom-theme`. By default yomonger will hop up three directories (you should see him do it to) and then scurry into the `manager/templates` directory looking for a folder with the name of your theme. If you want him to go somewhere else, you can tell him so but not until he asks.

## Generating a Project

From the terminal, run:

```bash
yo yomonger
```

You'll be greated by a friendly fellow named yeoman and then be asked several questions. Choose your answers carefully and let's meet back here when you are through.

```bash
     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
```

...

Well hello there. That didn't take log. Let's see if he generated all your stuff.

```bash
├── .editorconfig
├── .jshintrc
├── bower.json
├── Gruntfile.js
├── package.json
```

He snuck a little something in there didn't he? Well probably that's because you told him to. If you asked for Sass you'll have a `sass` directory:

```bash
├── sass
│   ├── index.scss
│   ├── login.scss
```

If you asked to start with the included Sass files of the default manager theme he moved several files into place for you. Did you give him a tip?

```bash
├── sass
│   ├── _box-sizing.scss
│   ├── __buttons.scss
│   ├── _colors-and-vars.scss
│   ├── _forms.scss
│   ├── _help.scss
│   ├── _image-set.scss
│   ├── _navbar.scss
│   ├── _tabs.scss
│   ├── _tree.scss
│   ├── _uberbar.scss
│   ├── _utility.scss
│   ├── _xtheme-modx.scss
│   ├── components
│       ├── _components.scss
│       ├── _primary-button.scss
│       ├── _shaded-box.scss
│   ├── index.scss
│   ├── index.scss
```

If you went with Less or raw CSS, well you know what you got.

## Building a Project
Now yomonger is a little compulsive, so he probably already did this for you. That's why you saw a bunch of npm stuff get installed. Let's have a look at what he did.

First he installed your node dependencies for you like this:

```bash
npm install
```

Then he just couldn't stand it, and had to see if your project would build successfully. Awesome, you got the works, all the grunt tasks you expect when [contributing to the default Manager theme](https://github.com/modxcms/revolution/tree/develop/_build/templates/default).

```bash
grunt build
```

Grunt Commands
----------------------------

__Build__<br>
Fetch dependencies (such as bourbon), move items into place and compile by running:

```bash
grunt build
```

__Watch__<br>
Compile the Sass and watch files for changes type the following:

```bash
grunt
```
_Note: grunt is now watching files for changes. When Sass files are changed CSS will automatically be generated.<br>Install the LiveReload [browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-) to inject CSS changes without a page refresh._

__Expand__<br>
Compile Sass using expanded output style for development by running:

```bash
grunt expand
```
