

module g {

    /**
     Representation of a 2-dimensional point.
     */
    export class Point {
        /**
         * @param x {number} x coordinate.
         * @param y {number} y coordinate.
         * @public
         */
        constructor(x:number, y: number);

        /**
         * @param that {Point} another point.
         * @public
         */
        constructor(that: Point);

        constructor(p1:any, p2?: any) {
            if (p1 != undefined && p2 != undefined) {
                this.x = p1;
                this.y = p2;
            } else if (p1 != undefined && p2 == undefined) {
                var that = <Point>p1;
                this.x = that.x;
                this.y = that.y;
            } else {
                throw 'illegal arguments: Point('+p1+','+p2+')';
            }
        }

        /** x coordinate */
        public x: number;

        /** y coordinate */
        public y: number;
    }

    /**
     Representation of a rectangle
     */
    export class Rectangle {

        /**
         * @param top {number} Upper boundary.
         * @param left {number} Left boundary.
         * @param bottom {number} Lower boundary.
         * @param right {number} Right boundary.
         * @public
         */
        constructor(top, left, bottom, right: number);

        /**
         * @param topLeft {Point} Upper left corner.
         * @param bottomRight {Point} Lower right corner.
         * @public
         */
        constructor(topLeft: Point, bottomRight: Point);

        /**
         * @param that {Rectangle} another rectangle.
         * @public
         */
        constructor(that: Rectangle);

        constructor(p1:any, p2?:any, p3?: number, p4?: number) {
            if (p1 != undefined && p2 != undefined && p3 != undefined && p4 != undefined) {
                this.topLeft = new Point(p1, p2);
                this.bottomRight = new Point(p3, p4);
            } else if (p1 != undefined && p2 != undefined && p3 == undefined && p4 == undefined) {
                this.topLeft = new Point(<Point>p1);
                this.bottomRight = new Point(<Point>p2);
            } else if (p1 != undefined && p2 == undefined && p3 == undefined && p4 == undefined) {
                var that: Rectangle = <Rectangle>p1;
                this.topLeft = new Point(that.topLeft);
                this.bottomRight = new Point(that.bottomRight);
            } else {
                throw 'illegal arguments: Rectangle('+p1+','+p2+','+p3+','+p4+')';
            }
        }

        /** upper left corner */
        public topLeft: Point;

        /** lower right corner */
        public bottomRight: Point;

        public containsX(x:number): boolean {
            return (this.topLeft.x <= x && x <= this.bottomRight.x);
        }

        public containsY(y:number): boolean {
            return (this.topLeft.y <= y && y <= this.bottomRight.y);
        }

        public contains(x:number,y:number):boolean {
            return this.containsX(x) && this.containsY(y);
        }

        /**
         * Getter for rectangle height (calculated value).
         *
         * @returns {number}
         * @readonly
         * @public
         */
        public get height() : number {
            return this.bottomRight.y - this.topLeft.y;
        }

        /**
         * Getter for rectangle width (calculated value).
         * @returns {number}
         * @readonly
         * @public
         */
        public get width() {
            return this.bottomRight.x - this.topLeft.x;
        }

        /**
         * Getter for left boundary.
         *
         * @returns {number}
         * @public
         */
        public get left() {
            return this.topLeft.x;
        }

        /**
         * Getter for upper boundary.
         *
         * @returns {number}
         * @public
         */
        public get top() {
            return this.topLeft.y;
        }

        /**
         * Getter for right boundary.
         *
         * @returns {number} right boundary.
         * @public
         */
        public get right() {
            return this.bottomRight.x;
        }

        /**
         * Getter for lower boundary.
         *
         * @returns {number} upper boundary.
         * @public
         */
        public get bottom() {
            return this.bottomRight.y;
        }

        /**
         * Setter for left boundary.
         *
         * @param v {number} left boundary.
         * @public
         */
        public set left(v: number) {
            this.topLeft.x = v;
        }

        /**
         * Setter for upper boundary.
         *
         * @param v {number} upper boundary.
         * @public
         */
        public set top(v: number) {
            this.topLeft.y = v;
        }

        /**
         * Setter for right boundary
         *
         * @param v {number} right boundary.
         * @public
         */
        public set right(v: number) {
            this.bottomRight.x = v;
        }

        /**
         * Setter for lower boundary
         *
         * @param v {number} lower boundary.
         * @public
         */
        public set bottom(v: number) {
            this.bottomRight.y = v;
        }
    }

    //var x = new Rectangle(0,0,10,20);
    //var y:boolean = x.width;
}
