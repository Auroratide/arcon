# arcon

All this does is parse RCON data into React elements.

## RCON???

What is RCON, you ask?  RCON stands for React Component Object Notation!  It's basically just React components encoded in JSON format.

For example, let's say we had the following JSX:

```html
<p>Click <Link to='http://google.com'>here</Link> to go to Google.</p>
```

This is the same thing in RCON:

```js
{
  component: 'p',
  children: ['Click ', {
    component: 'Link',
    children: 'here',
    props: {
      to: 'http://google.com'
    }
  }, ' to go to Google.']
}
```

## Why would I use RCON?

For storage, mainly.  An RCON data structure is pretty well suited for JSON files or JSON-based databases like Mongo or CouchDB.

Imagine, for instance, that you have a blog website written mostly using React.  You *could* use just regular paragraphs for all of your blog posts, but that would be boring.  You want your posts to sometimes utilize *fancy* components, components with behaviour and user interaction.

But how do you encode these fancy components in your database?

Truth be told, there are many ways.  You can store a page as XML or just a single, very long string.  But if you are using a JSON-based database, are writing an API that responds with JSON, or just generally love JSON, then the RCON format works rather nicely.

Especially because there's an npm package which specifically parses RCON into React components!

## Using arcon

**arcon** is a library which takes data in RCON format and spits out respective React elements.

### arcon.parse()

```js
import arcon from 'arcon';

const components = {
  component: 'p',
  children: 'This is a paragraph.'
};

arcon.parse(components);
```

That's it!  The `parse()` function takes an RCON structure and returns a renderable set of React components.

### arcon.use()

The `use()` function allows you to provide a list of your personal custom components.

```js
class MyAwesomeComponent extends React.Component {
  render() {
    return <span>Awesome.</span>;
  }
}

const components = {
  MyAwesomeComponent
};

const myArcon = arcon.use(components);
```

This method takes as a parameter the key-value set of components you wish **arcon** to be able to parse.  The code above allows arcon to know to parse the following RCON into an instance of `MyAwesomeComponent`.

```js
{
  component: 'MyAwesomeComponent'
}
```

A new **arcon** instance is returned.  Therefore, you can simply do `arcon.use(components).parse(rcon)`, or perhaps more appropriately, you can wrap **arcon** and use the wrapper throughout your code instead:

```js
//  rcon-parser.js
import arcon from 'arcon';
import myComponents from './components';

export default arcon.use(myComponents);
```

## Official RCON Specification

Formally, the RCON structure is as follows:

```
<RCON> :: <string>
<RCON> :: <number>
<RCON> :: <boolean>
<RCON> :: {
  component: <string>
  children: <RCON>
  props: <Object>
}
<RCON> :: [<RCON>]
```

## Example

In this example, an API returns a page's content as RCON.  The content is rendered to the page via React.

```js
import React from 'react';
import arcon from 'arcon';
import myComponents from '../components';
import api from '../api';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: null };
  }

  componentDidMount() {
    api.getPageInfo(this.props.pageId).then(page => {
      this.setState({
        content: page.content
      });
    });
  }

  render() {
    return <div className='page-content'>
      {arcon.use(myComponents).parse(this.state.content)}
    </div>;
  }
}
```
