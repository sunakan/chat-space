FROM ruby:2.6.4-slim-buster

RUN apt-get update -qq
RUN apt-get install -y build-essential nodejs default-libmysqlclient-dev

WORKDIR /usr/local/app
COPY Gemfile* ./

RUN gem install bundler
RUN bundle install

COPY . ./
