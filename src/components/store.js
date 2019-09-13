import { BehaviorSubject } from "rxjs";

// skapa en store för tokens
export const item$ =
    new BehaviorSubject(JSON.parse( window.localStorage.getItem('item') || '[]'));
// då token sparas och laddas från localStorage som JS objekt

export function updateItem(newItem) {
    if (!newItem) { // om är tomt
        window.localStorage.removeItem('item'); // udvika auto logain igen
    } else {
        //  uppdatera for usern till JSON obj
        window.localStorage.setItem('item', JSON.stringify(newItem));
    }
    //  uppdatera tokens värde
    item$.next(newItem);
}