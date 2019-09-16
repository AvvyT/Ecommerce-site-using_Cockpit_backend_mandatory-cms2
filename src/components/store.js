import { BehaviorSubject } from "rxjs";

// skapa en store för tokens
export const item$ =
    new BehaviorSubject(JSON.parse(window.localStorage.getItem('item') || '[]'));
// då token sparas och laddas från localStorage som JS objekt

export function updateItem(newItem) {
    console.log(newItem);
    
    if (!newItem) { // om är tomt
        window.localStorage.removeItem('item'); // udvika auto logain igen
    } else {
        //  uppdatera for usern till JSON obj
        window.localStorage.setItem('item', JSON.stringify(newItem));
    }
    //  uppdatera tokens värde
    item$.next(newItem);
}

export function deleteProduct(product) {
    let newList = [...item$.value];
    const index = newList.findIndex(x => x.article._id === product._id);

    if (index >= 0) {
        newList[index].sum -= 1;
    }

    newList = newList.filter(x => x.sum > 0);

    window.localStorage.setItem("item", JSON.stringify(newList));
    item$.next(newList);
}

export function getTotalPrice() {
    let total = 0;
    let allArticles = item$.value;

    for (let index = 0; index < allArticles.length; index++) {
        console.log(allArticles[index]);

        let productPrice = allArticles[index].article.Pris;
        let productSum = allArticles[index].sum;

        total += productPrice * productSum;
        //console.log(total);
    }
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
}