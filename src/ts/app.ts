import {Tooltip} from 'bootstrap';

export class App {
    tooltipList: Tooltip[];

    constructor() {
        this.initTooltips();
    }

    initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        this.tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl));
    }
}
