import React, { ReactNode } from "react";
import defer from "defer-promise";

export type IPendingScroll = DeferPromise.Deferred<void>;

type IInfinitScrollPropsBase =
	| {
			/**
			 * @description Scrollable html element or Document
			 */
			scrollable: HTMLElement | Document;
			selfScroll: false;
	  }
	| {
			scrollable: undefined;
			/**
			 * @description InfinitScroll is himself scrollable
			 */
			selfScroll: boolean;
	  };

export type IInfinitScrollProps = {
	/**
	 * @description Trigger at some pixels at the bottom
	 * @default 100px
	 */
	rootRef: React.RefObject<HTMLTableElement>;
	triggerOnRestPixels: number;
	onNext: (pendingScroll: IPendingScroll) => void;
	children?: ReactNode;
} & IInfinitScrollPropsBase &
	React.TableHTMLAttributes<HTMLTableElement>;

export type IInfinitScrollState = {};

export default abstract class InfinitScroll extends React.Component<IInfinitScrollProps, IInfinitScrollState> {
	private element: HTMLElement | Document | null = null;
	private deferred: IPendingScroll | null = null;
	private pendingPromise: boolean = false;
	public static defaultProps: IInfinitScrollProps = {
		scrollable: window.document,
		selfScroll: false,
		triggerOnRestPixels: 100,
		rootRef: React.createRef<HTMLTableElement>(),
		onNext: (pendingScroll: IPendingScroll) => {
			pendingScroll.resolve();
		},
	};

	public constructor(props: IInfinitScrollProps) {
		super(props);
		this.onScroll = this.onScroll.bind(this);
	}

	public override render(): React.ReactNode {
		const attributes: Partial<IInfinitScrollProps> = { ...this.props };
		delete attributes.onNext;
		delete attributes.scrollable;
		delete attributes.selfScroll;
		delete attributes.triggerOnRestPixels;
		delete attributes.rootRef;

		return (
			<table {...attributes} ref={this.props.rootRef} >
				{this.props.children}
			</table>
		);
	}

	public override componentDidMount() {
		this.element = this.props.scrollable ?? this.props.rootRef.current!;
		if (this.props.selfScroll) {
			this.element = this.props.rootRef.current!;
		}

		this.element.addEventListener("scroll", this.onScroll);
		window.addEventListener("resize", this.onScroll);

		this.handleScrollEvent(this.element);
	}

	public override componentWillUnmount() {
		if (!this.element) return;
		this.element.removeEventListener("scroll", this.onScroll);
		window.removeEventListener("resize", this.onScroll);
	}

	private onNext(pendingScroll: IPendingScroll) {
		this.props.onNext(pendingScroll);
	}

	private onScroll() {
		if (!this.element) return;
		this.handleScrollEvent(this.element);
	}

	private async handleScrollEvent(element: HTMLElement | Document) {
		if (this.pendingPromise && this.deferred) return;
		
		if (this.deferred) {
			this.pendingPromise = true;
			try {
				await this.deferred.promise;
			} catch (e) {
			}
			this.pendingPromise = false;
		}

		if (element instanceof Document) element = element.documentElement;

		const clientSize = this.getClientSize(element);
		const scrollSize = this.getScrollSize(element);
		const scrollStart = this.getScrollStart(element);
		const scrollRest = scrollSize - clientSize - scrollStart;
		const subjectElement = this.props.rootRef.current!;
		const subjectElementLimit = Math.ceil(this.getBoundariesLimit(subjectElement.getBoundingClientRect()));

		if (subjectElementLimit - this.props.triggerOnRestPixels > clientSize) return;

		let triggerNext = false;

		if (!this.props.selfScroll && subjectElementLimit - this.props.triggerOnRestPixels < clientSize) {
			triggerNext = true;
		}

		if (!triggerNext && scrollRest < this.props.triggerOnRestPixels) {
			triggerNext = true;
		}

		if (!triggerNext) return;

		this.deferred = defer();
		this.onNext(this.deferred);
		try {
			await this.deferred.promise;
		} catch (e) {
			return;
		}
		this.handleScrollEvent(element);
	}

	protected abstract getClientSize(element: HTMLElement): number;
	protected abstract getScrollSize(element: HTMLElement): number;
	protected abstract getScrollStart(element: HTMLElement): number;
	protected abstract getBoundariesLimit(boundaries: DOMRect): number;
}
