import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface InputDefinition {
    valueType: 'string' | 'number' | 'boolean';
    valueRange: {
        min: number,
        max: number
    };
    isRequired: boolean;
}

@Component({
    selector: 'app-input',
    template: `
    
    <ng-container [ngSwitch]="definition?.valueType">

        <ng-container *ngSwitchCase="string">
            <input type="text" [(ngModel)]="value" (ngModelChange)="onChange()" />
        </ng-container>

        <ng-container *ngSwitchCase="number">
            <input type="number" [(ngModel)]="value" (ngModelChange)="onChange()" />
        </ng-container>

        <ng-container *ngSwitchCase="boolean">
            <input type="checkbox" [(ngModel)]="value" (ngModelChange)="onChange()" />
        </ng-container>

        <ng-container *ngSwitchDefault>
            Unsupported value type
        </ng-container>

    </ng-container>

    <div *ngIf="error">
        {{error}}
    </div>
    
    `
})
export class InputComponent {

    @Input()
    definition!: InputDefinition;

    error!: string | null;

    @Input()
    value!: string | number | boolean;
    @Output()
    valueChange: EventEmitter<string | number | boolean> = new EventEmitter();

    onChange(): void {
        let error: string | null = null;
        if (this.definition.valueRange) {
            error = this.validateValueRange();
        }
        if (this.definition.isRequired && !this.value) {
            error = 'Value is required';
        }

        this.error = error;
    }

    private validateValueRange(): string | null {
        if (!this.value) {
            return null;
        }
        switch (this.definition.valueType) {
            case 'string':
                return (<string>this.value).length >= this.definition.valueRange.min &&
                    (<string>this.value).length <= this.definition.valueRange.max ? null :
                    `Value needs to be between ${this.definition.valueRange.min} - ${
                        this.definition.valueRange.max}`;
            case 'number':
                return (<number>this.value) >= this.definition.valueRange.min &&
                    (<number>this.value) <= this.definition.valueRange.max ? null :
                    `Value needs to be between ${this.definition.valueRange.min} - ${
                        this.definition.valueRange.max}`;
                
        }
        return null;
    }
}
