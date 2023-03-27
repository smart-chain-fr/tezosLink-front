import InfinitScroll, { IInfinitScrollProps } from "..";

export default class InfinitScrollHorizontal extends InfinitScroll {
	public constructor(props: IInfinitScrollProps) {
		super(props);
	}
	
	protected getClientSize(element: HTMLElement): number {
		return element.clientWidth;
	}
	
	protected getScrollSize(element: HTMLElement): number {
		return element.scrollWidth;
	}

	protected getScrollStart(element: HTMLElement): number {
		return element.scrollLeft;
	}

	protected getBoundariesLimit(boundaries: DOMRect): number {
		return boundaries.right - boundaries.x;
	}
}
