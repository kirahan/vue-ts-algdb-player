export default class ByteArray {
    static SIZE = 4096;
    static CHAR_MAP = (() => {
        const map = [];
        for (let i = 0; i < 256; i++) {
            map[i] = String.fromCharCode(i);
        }
        return map;
    })();

    pages: Uint8Array[] = [];
    cursor = 0;
    constructor() {
        this.newPage();
    }

    newPage() {
        this.pages.push(new Uint8Array(ByteArray.SIZE));
        this.cursor = 0;
    }

    get length() {
        return (this.pages.length - 1) * ByteArray.SIZE + this.cursor;
    }

    getData() {
        const length = this.length;
        const data = new Uint8Array(length);
        let index = 0;
        for (let p = 0; p < this.pages.length; p++) {
            for (let i = 0; i < ByteArray.SIZE; i++) {
                data[index++] = this.pages[p][i];
                if (index == data.length) {
                    break;
                }
            }
        }
        return data;
    }

    writeByte(value: number) {
        if (this.cursor >= ByteArray.SIZE) {
            this.newPage();
        }
        this.pages[this.pages.length - 1][this.cursor++] = value;
    }

    writeShort(value: number) {
        this.writeByte(value & 0xff);
        this.writeByte((value >> 8) & 0xff);
    }

    writeLong(value: number) {
        this.writeByte(value & 0xff);
        this.writeByte((value >> 8) & 0xff);
        this.writeByte((value >> 16) & 0xff);
        this.writeByte((value >> 24) & 0xff);
    }

    writeBytes(array: Uint8Array, length: number | null = null) {
        for (let i = 0; i < (length == null ? array.length : length); i++) {
            this.writeByte(array[i]);
        }
    }

    writeString(value: string) {
        for (let l = value.length, i = 0; i < l; i++) {
            this.writeByte(value.charCodeAt(i));
        }
    }
}