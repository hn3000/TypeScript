/// <reference path="fourslash.ts" />

////class Foo {
////    [|set|] bar(b: any) {
////    }
////
////    public [|get|] bar(): any {
////        return undefined;
////    }
////
////    public set set(s: any) {
////    }
////
////    public get set(): any {
////        return undefined;
////    }
////
////    public set get(g: any) {
////    }
////
////    public get get(): any {
////        return undefined;
////    }
////}

test.ranges().forEach(r => {
    goTo.position(r.start);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });

    verify.occurrencesAtPositionCount(test.ranges().length);
});
