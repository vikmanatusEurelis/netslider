# NetSlider

An Animated Slider Component for React.

### Installation

```
// with npm
$ npm install netslider --save

// with yarn
$ yarn add netslider
```

### Usage

Here is a quick example to get you started, **it's all you need**:

```jsx
import NetSlider from 'netslider';
import 'netslider/styles.min.css';
import { data } from './carddata'; /* Update Soon */
import SliderContainer from '../lib/SliderContainer';

function SliderTemplate(props) {
	return (
		<div className='slider-container-wrapper'>
			<SliderContainer videoModel={props.videoModel} model={props.model} />
		</div>
	);
}
export default function NetSliderContainer(props) {
	return (
		<div className='netslider-container' style={{ overflow: 'hidden', height: '400px' }}>
			<h1 style={{ textAlign: 'center', margin: '40px 0' }}>NetSlider</h1>
			<NetSlider
				className='netslider_title_card'
				data={data}
				slideTemplate={props => <SliderTemplate {...props} />}
			/>
		</div>
	);
}
```

```jsx
// SliderContainer.js

import React from 'react';

export default function SliderContainer(props) {
	return <div className='slider-container-title'>{props.videoModel.title}</div>;
}
```

Yes, it's really all you need to get started as you can see in this live and interactive demo:

[![Edit Button](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/0xq2on1mwv)

### Props

| Name          | Type     | Required | Description                 |
| ------------- | -------- | -------- | --------------------------- |
| className     | `string` | `true`   | the src of image            |
| data          | `object` | `true`   | slider data object          |
| slideTemplate | `object` | `true`   | template for slider content |

### Screenshot

![Preview][screenshot]

[screenshot]: https://raw.githubusercontent.com/anishmprasad/netslider/master/screenshot/Screenshot.png 'Preview screenshot'

### Demo

-   [anish.m.prasad.com](https://anishmprasad.com/opensource/netslider)
-   [anishmprasad.github.io](https://anishmprasad.github.io/opensource/netslider)
-   [codesandbox.io](https://codesandbox.io/embed/0xq2on1mwv)

### TODO

-   [x] Minification
-   [ ] Production Level
-   [ ] CSS Polishing and Transitions
-   [ ] Documentation

### Under Active Development

### Disclaimer

This plugin is not officially commisioned/supported by Netflix.
The trademark "Netflix" is registered by "Netflix, Inc."

### License

Apache 2.0
