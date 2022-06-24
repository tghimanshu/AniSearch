import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({
  name: 'urlEncode',
})
export class UrlEncodePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(text: string) {
    return encodeURIComponent(text);
  }
}

@Pipe({
  name: 'sanitizeHtml',
})
export class ParseHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
