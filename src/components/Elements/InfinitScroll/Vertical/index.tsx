import InfinitScroll, { IInfinitScrollProps } from "..";

export default class InfinitScrollVertical extends InfinitScroll {
	public constructor(props: IInfinitScrollProps) {
		super(props);
	}

	protected getClientSize(element: HTMLElement): number {
		return element.clientHeight;
	}
	
	protected getScrollSize(element: HTMLElement): number {
		return element.scrollHeight;
	}

	protected getScrollStart(element: HTMLElement): number {
		return element.scrollTop;
	}

	protected getBoundariesLimit(boundaries: DOMRect): number {
		return boundaries.bottom;
	}
}
