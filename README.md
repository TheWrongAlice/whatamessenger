# whatamessenger

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

## Project setup
- Clone the repository:
```
git clone git@github.com:TheWrongAlice/whatamessenger.git
```
- Install Node by downloading from [here](https://nodejs.org/en/download/)
- Install Ruby by downloading from [here](http://rubyinstaller.org/downloads/)
- Install the compass gem:
```
gem install compass
```
- Install project dependencies:
```
npm install
bower install
```

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

You can deploy the project through the [AWS S3 Console](https://console.aws.amazon.com/s3/buckets/whatamessenger/?region=us-east-1&tab=overview).
Upload all the contents of the _dist_ directory. Make sure to assign the proper file permissions (select everything and choose _make public_).
