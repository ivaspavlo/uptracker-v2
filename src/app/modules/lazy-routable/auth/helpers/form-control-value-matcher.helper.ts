import { AbstractControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';

export const checkIfControlValuesMatched = (controlA: AbstractControl, controlB: AbstractControl): Observable<boolean> => {
    return merge(
        controlA.valueChanges.pipe(map(a => ({ a }))),
        controlB.valueChanges.pipe(map(b => ({ b })))
    ).pipe(
        scan((acc, curr ) => ({ ...acc, ...curr }), { a: null, b: null }),
        map(({ a, b }) => a === b)
    );
};


