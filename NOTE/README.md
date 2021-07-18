# Nest JS

- 서버 app을 구축하기 위한 nodejs의 프레임워크
- TS의 적극적인 도입, DI(Dependency injection), IoC(Inversion of Control), Module을 통한 구조화 등의 기술을 통해 생산적인 개발이 용이함

```
$ npm install -g @nestjs/cli
$ nest
$ nest new
```

# 1.1 Controllers

- `app.module.ts`: import everything we do

```ts
// app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 데코레이터라고 부름
// 클래스 위에 기능 추가 가능
// 클래스 위의 함수 -> 클래스를 위해 작동 (like 초콜렛칩s on top of 아이스크림)
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

# 1.2 Services

```ts
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello(); // @1
  }
  @Get('/hello') // @2
  sayHello(): string {
    return 'hiya!';
  }
}
```

`@2`처럼 string을 직접 넣어줘도 정상적으로 실행 됨. 그런데 왜! 굳이 `@1` 의 방법처럼 하려는걸까?<br/>
-> NestJS는 controller와 business logic을 구분짓고 싶어함!!

- structure and architecture
  - Nest JS wants to separate the controller and the business logic.
    - Controller: in charge of getting url & executing functions only.
    - Other business logics: go to a service (Service: actual functions)

```ts
// app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getHi(): string {
    // app.service에서 함수 선언해주고
    return 'Hello Nest JS';
  }
}
```

```ts
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/hello')
  sayHello(): string {
    // app.controller에서 선언해준 함수를 호출해 실행
    return this.appService.getHi();
  }
}
```

- NestJS 컨벤션에 따르면 같은 함수이름으로 선언, 호출 해줘야 함 (getHello())
- 하지만 반드시 그렇게 할 필요는 없음 (sayHello(), getHi())
