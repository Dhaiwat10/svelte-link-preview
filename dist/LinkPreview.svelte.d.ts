import { SvelteComponentTyped } from "svelte";
import './LinkPreview.css';
declare const __propDef: {
    props: {
        /**
             * The url for which the preview is to be rendered.
             */ url: string;
        /**
             * The Proxy url you need to setup. See https://github.com/Rob--W/cors-anywhere
            */ proxyUrl: string;
        /**
             * The width of the preview card.
             */ width?: string | number | null | undefined;
        /**
             * The height of the preview card.
             */ height?: string | number | null | undefined;
        /**
             * The class you want to apply to the preview card container.
             */ className?: string | undefined;
        /**
             * The image's height.
             */ imageHeight?: string | number | null | undefined;
        /**
             * The alignment of the text inside the card.
             */ textAlign?: string | null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type LinkPreviewProps = typeof __propDef.props;
export type LinkPreviewEvents = typeof __propDef.events;
export type LinkPreviewSlots = typeof __propDef.slots;
export default class LinkPreview extends SvelteComponentTyped<LinkPreviewProps, LinkPreviewEvents, LinkPreviewSlots> {
}
export {};
