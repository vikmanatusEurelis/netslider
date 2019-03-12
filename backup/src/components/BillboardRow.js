/** eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BillboardRow extends Component {
	getInitialState() {
		var e = this.getBillboardData(),
			t = b.getAvailabilityTimeRemaining(e),
			i = t <= 0;
		return (
			y.billboardGetInitialState(),
			{
				lolomoVisible: !0,
				hasScrolled: !1,
				useAvailablePhase: i
			}
		);
	}
	getChildContext() {
		var e = this.getBillboardData();
		return {
			requestId: this.getRequestId(),
			listId: this.getId(),
			rowNum: this.props.rowNum,
			rankNum: 0,
			trackId: this.getTrackId(),
			supplementalVideoId: a.get(e, 'videoAssets.horizontalBackground.motionId')
		};
	}
	componentDidMount() {
		g.addEventListener('scroll', this.onScroll);
		var e = this.getBillboardData(),
			t = b.getAvailabilityTimeRemaining(e);
		if (t > 0) {
			var i = this;
			this.disposeTimeout = f(
				function() {
					i.setState({
						useAvailablePhase: !0
					});
				},
				t,
				3e4
			);
		}
		this.context.getModelData('truths').refreshBillboardOnTTL &&
			this.context.discoveryApp.getActionCreators().queueBillboardExpire({
				listId: this.getId(),
				listIndex: this.props.rowNum,
				lolomoId: this.context.lolomoId
			}),
			I.on('myList:remove:end', this.onMyListChange),
			I.on('myList:add:end', this.onMyListChange);
	}
	componentWillUnmount() {
		g.removeEventListener('scroll', this.onScroll),
			I.removeListener('myList:remove:end', this.onMyListChange),
			I.removeListener('myList:add:end', this.onMyListChange),
			this.disposeTimeout && this.disposeTimeout();
	}
	getId() {
		return this.props.model.getValueSync(['id']);
	}
	getRequestId() {
		return this.props.model.getValueSync(['requestId']);
	}
	getTrackId() {
		var e = this.props.model.getValueSync(['trackIds']),
			t = void 0;
		return e && (t = e.trackId), t;
	}
	onScroll(e) {
		this.state.hasScrolled ||
			(this.setLolomoVisibility(!0),
			this.setState({
				hasScrolled: !0
			}),
			g.removeEventListener('scroll', this.onScroll));
	}
	setLolomoVisibility(e) {
		this.state.lolomoVisible !== e &&
			this.setState({
				lolomoVisible: e
			});
	}
	record(e, t, i) {
		if (A) {
			var o = t.impressionToken;
			e === v.RECORD_ACTION && (o = t.actionToken),
				v.recordActionOrImpression(o, this.context.jsongDocument, e, i);
		} else {
			var r = t.awardTrackId,
				s = t.billboardTheme,
				a = t.billboardType;
			v.recordActionOrImpressionLegacy(this.context.jsongDocument, e, i, r, s, a);
		}
	}
	recordAction(e, t) {
		this.record(v.RECORD_ACTION, e, t);
	}
	recordImpression(e, t) {
		this.record(v.RECORD_IMPRESSION, e, t);
	}
	getProfilesData() {
		for (var e = this.context.jsongDocument, t = [], i = 0; i < 5; i++) {
			var o = e.bind(['profilesList', i]);
			o && t.push(o.getValueSync(['avatar', 'images', 'byWidth', 320]));
		}
		return t;
	}
	getBillboardData() {
		var e = m.getExtensionForTransparentImage(this.context.models),
			t = ['billboards', 0, e, 'data'];
		return this.props.model.getValueSync(t);
	}
	backgroundImageStartsPlay(e) {
		return -1 !== x.indexOf(e);
	}
	shouldComponentUpdate(e, t) {
		var i = this.state;
		return (
			t.hasScrolled !== i.hasScrolled ||
			t.useAvailablePhase !== i.useAvailablePhase ||
			t.lolomoVisible !== i.lolomoVisible ||
			t.isVisible !== i.isVisible
		);
	}
	onMyListChange() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
		this._videoId === e.videoId && this.forceUpdate();
	}
	render() {
		var e = this.props,
			t = this.context.getModelData('truths'),
			i = e.model && e.model.bind([0, 'reference']),
			o = this.getBillboardData(),
			s = this.state,
			n = e.forceStatic;
		if (!o)
			return React.createElement(
				k,
				{
					className: 'billboard-row-no-draw-height'
				},
				React.createElement(S, {
					rank: 0,
					row: this.props.rowNum,
					listId: this.getId(),
					trackId: this.getTrackId()
				})
			);
		var d = o && o.id;
		this._videoId = d;
		var h = c(o, t),
			m = b.isMotionBillboardEnabled(n),
			g = this.backgroundImageStartsPlay(d),
			p = this.context.isRtl,
			I = o.assets || {},
			v = I.background || {},
			f = 'light' === v.tone,
			y = a.get(o, 'assets.background.imageKey'),
			T = l({
				'billboard-row': !0,
				'dim-lolomo': !s.lolomoVisible
			}),
			x = {
				billboard: !0,
				'billboard-pane': !0,
				'billboard-pane-main': !0,
				'episodic-billboard': u.isEpisodic(o),
				'billboard-originals': !0,
				'full-bleed-billboard': b.isFullBleed(p, o),
				'background-image-starts-play': g,
				'light-tone': f
			};
		return React.createElement(
			'div',
			{
				className: T,
				role: 'region',
				'aria-label': this.context.formatString(L.billboardActionsFeatured)
			},
			React.createElement(h, {
				key: 'bb-0',
				isMotionEnabled: m,
				imageKey: y,
				videoId: d,
				backgroundImageStartsPlay: g,
				videoModel: i,
				billboardData: o,
				profilesData: this.getProfilesData(),
				trackId: this.getTrackId(),
				billboardClasses: x,
				hasScrolled: s.hasScrolled,
				useAvailablePhase: s.useAvailablePhase,
				truths: t,
				setLolomoVisibility: this.setLolomoVisibility,
				recordAction: this.recordAction,
				recordImpression: this.recordImpression
			})
		);
	}
}
