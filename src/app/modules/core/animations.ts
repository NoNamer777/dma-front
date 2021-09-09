import { animate, state, style, transition, trigger } from '@angular/animations';

export const dmaHeaderShadowAnimation = trigger('openedCollapsed', [
    state(
        'true',
        style({
            marginBottom: '1rem',
            boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .15)',
        }),
    ),
    state(
        'false',
        style({
            marginBottom: '',
            boxShadow: '',
        }),
    ),
    transition('true => false', [animate('0ms')]),
    transition('false => true', [animate('200ms 200ms ease-in-out')]),
]);

export const dmaCenterExpandAnimation = trigger('expandShrink', [
    state(
        'true',
        style({
            paddingTop: '1rem',
        }),
    ),
    state(
        'false',
        style({
            paddingTop: '',
        }),
    ),
    transition('true => false', [animate('380ms ease-in')]),
    transition('false => true', [animate('0ms')]),
]);
