import * as _ from 'lodash'
import moment from 'moment'
export class UtilService {
  insertToArray(arr: any[], index: number, ...newItems: any) {
    return [
      ...arr.slice(0, index),
      ...newItems,
      ...arr.slice(index)
    ]
  }

  async parseMessengeWithInfo(params: {
    message: string,
    info: any
  }) {
    let { message } = params
    const { info } = params
    const regex = /({|})/g
    const regex2 = /({{\w+}})|({{\w+(?:\.\w+)+)}}/g
    if (regex.test(message)) {
      const replaceText: RegExpMatchArray | null = message.match(regex2)
      if (replaceText) {
        for (let item of replaceText) {
          item = item.replace(regex, '');
          message = message.replace(item, _.get(info, item));
        }
        message = message.replace(regex, '')
      }
    }
    return message
  }
  async encode(data: any) {
    const arr = this.encodeObject(data)
    return arr.join(':')
  }
  encodeObject(data: any): any[] {
    const arr = [];
    const keys = Object.keys(data)
    for (const key of keys) {
      let str;
      let arrobj = [];
      if (typeof (data[key]) == 'object') {
        arrobj = this.encodeObject(data[key]);
        for (const element of arrobj) {
          str = key + '.' + element;
          arr.push(str);
        }
      }
      else {
        str = key + '=' + data[key];
        arr.push(str);
      }
    }
    return arr;
  }
  async decode(data: any) {
    const arr1 = [];
    const arr2 = [];
    const arr = data.split(':');
    const arrElement = [];
    for (let item of arr) {
      if (/(\.\d\.)/g.test(item)) {
        let num = item.match(/(\.\d\.)/g).join();
        num = num.replace(/\./g, '');
        item = item.replace(/(\.\d)/g, '[' + num + ']')
      }
      else if (/(\.\d)/g.test(item)) {
        let num = item.match(/(\.\d)/g).join();
        num = num.replace(/\./g, '');
        item = item.replace(/(\.\d)/g, '[' + num + ']')
      }
      const element = item.split('=');
      arr1.push(element[0]);
      arr2.push(element[1]);
    }
    arrElement.push(arr1);
    arrElement.push(arr2);
    return arrElement;
  }

  convertViToEng(string: string) {
    const obj = {
      ??: 'D', ??: 'd', ??: 'a',
      ??: 'a', ??: 'e', ??: 'o', ??: 'o',
      ??: 'u',
      ??: 'a', ??: 'a', ???: 'a', ???: 'a', ??: 'a',
      ???: 'a', ???: 'a', ???: 'a', ???: 'a', ???: 'a',
      ???: 'a', ???: 'a', ???: 'a', ???: 'a', ???: 'a',
      ??: 'e', ??: 'e', ???: 'e', ???: 'e', ???: 'e',
      ???: 'e', ???: 'e', ???: 'e', ???: 'e', ???: 'e',
      ??: 'y', ???: 'y', ???: 'y', ???: 'y', ???: 'y',
      ??: 'u', ??: 'u', ???: 'u', ??: 'u', ???: 'u',
      ???: 'u', ???: 'u', ???: 'u', ???: 'u', ???: 'u',
      ??: 'i', ??: 'i', ???: 'i', ???: 'i', ??: 'i',
      ??: 'o', ??: 'o', ???: 'o', ??: 'o', ???: 'o',
      ???: 'o', ???: 'o', ???: 'o', ???: 'o', ???: 'o',
      ???: 'o', ???: 'o', ???: 'o', ???: 'o', ???: 'o'
    } as any;

    string = string.trim();
    string = string.toLowerCase();

    const arr: string[] = string.split('');

    for (const i in arr) {
      const arri = arr[i]
      if (!arri) continue;
      if (obj[arri]) {
        arr[i] = obj[arri];
      }
    }

    return arr.join('');
  }

  changeToSlug(title: string, prefix: string) {
    // ?????i ch??? hoa th??nh ch??? th?????ng
    let slug = title.toLowerCase();

    // ?????i k?? t??? c?? d???u th??nh kh??ng d???u
    slug = slug.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'a');
    slug = slug.replace(/??|??|???|???|???|??|???|???|???|???|???/gi, 'e');
    slug = slug.replace(/i|??|??|???|??|???/gi, 'i');
    slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???|??|???|???|???|???|???/gi, 'o');
    slug = slug.replace(/??|??|???|??|???|??|???|???|???|???|???/gi, 'u');
    slug = slug.replace(/??|???|???|???|???/gi, 'y');
    slug = slug.replace(/??/gi, 'd');
    // X??a c??c k?? t??? ?????t bi???t
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // ?????i kho???ng tr???ng th??nh k?? t??? g???ch ngang
    slug = slug.replace(/ /gi, "-");
    // ?????i nhi???u k?? t??? g???ch ngang li??n ti???p th??nh 1 k?? t??? g???ch ngang
    // Ph??ng tr?????ng h???p ng?????i nh???p v??o qu?? nhi???u k?? t??? tr???ng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    // X??a c??c k?? t??? g???ch ngang ??? ?????u v?? cu???i
    slug = `@${slug}@`.replace(/\@\-|\-\@|\@/gi, '');
    return `@${slug}-${prefix}@`.replace(/\@\-|\-\@|\@/gi, '')
  }


  convertViToEngSlug(string: string) {
    const obj = {
      ??: 'D', ??: 'd', ??: 'a',
      ??: 'a', ??: 'e', ??: 'o', ??: 'o',
      ??: 'u',
      ??: 'a', ??: 'a', ???: 'a', ???: 'a', ??: 'a',
      ???: 'a', ???: 'a', ???: 'a', ???: 'a', ???: 'a',
      ???: 'a', ???: 'a', ???: 'a', ???: 'a', ???: 'a',
      ??: 'e', ??: 'e', ???: 'e', ???: 'e', ???: 'e',
      ???: 'e', ???: 'e', ???: 'e', ???: 'e', ???: 'e',
      ??: 'y', ???: 'y', ???: 'y', ???: 'y', ???: 'y',
      ??: 'u', ??: 'u', ???: 'u', ??: 'u', ???: 'u',
      ???: 'u', ???: 'u', ???: 'u', ???: 'u', ???: 'u',
      ??: 'i', ??: 'i', ???: 'i', ???: 'i', ??: 'i',
      ??: 'o', ??: 'o', ???: 'o', ??: 'o', ???: 'o',
      ???: 'o', ???: 'o', ???: 'o', ???: 'o', ???: 'o',
      ???: 'o', ???: 'o', ???: 'o', ???: 'o', ???: 'o'
    } as any;

    string = string.trim();
    string = string.toLowerCase();

    const arr = string.split('');

    for (const i in arr) {
      const arri = arr[i]
      if (!arri) continue;
      if (obj[arri]) {
        arr[i] = obj[arri];
      }
    }

    let slug = arr.join('');
    slug = slug.replace(/ /g, '-');
    // slug = slug.replace(/[^a-zA-Z0-9]/g, '');
    return slug.replace(/[^a-zA-Z0-9\-]/g, '');
  }

  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  isEmpty(val: any) {
    return (val === undefined || val == undefined || val.length <= 0) ? true : false;
  }

  allEmpty(...val: any) {
    for (const item of val) {
      if (item !== undefined && item !== undefined) return false;
    }
    return true;
  }
  revokeFileName(oldFileName: string, addTime: boolean = true, resizeOptions?: { height: number, width: number }) {

    const index = oldFileName.lastIndexOf('.')
    const newFileName = `${oldFileName.substring(0, index)}${addTime ? `-${moment().valueOf()}` : ''}`
    if (resizeOptions?.height || resizeOptions?.width) {
      return `${newFileName}-${resizeOptions.width}x${resizeOptions.height}${oldFileName.substring(index)}`
    }
    return `${newFileName}${oldFileName.substring(index)}`

  }
  makeContent(content: string, values: any) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key];
        const re = new RegExp(`\\[${key}\\]`, 'g');
        content = content.replace(re, value);
      }
    }
    return content
  }
  snakeCaseToCamelCase(string: string) {
    return string.toLowerCase().replace(/([-_][a-z])/g, group =>
      group
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
    );
  }


  camelCaseToSnakeCase(string: string) {
    const result = string.replace(/([A-Z])/g, " $1");
    return result.split(' ').filter(item => !!item.trim()).join('_').toLowerCase();
  }

  camelize(string: string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  capitalize(string: string) {
    return string[0]?.toUpperCase() + string.slice(1);
  }

  generateUUIDV4() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}
