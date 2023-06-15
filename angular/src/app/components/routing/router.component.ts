import { Component } from "@angular/core";

@Component({
    selector: 'app-router',
    template: `
        <div>
            <a src="/one">One</a>
            <a src="/two">Two</a>
        </div>
        <router-outlet></router-outlet>
    `
})
export class RouterComponent {} 