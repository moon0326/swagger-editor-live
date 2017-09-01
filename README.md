For those of you who are looking for a solution for multifile Swagger files support and better local workflow, take a look at https://github.com/moon0326/swagger-ui-watcher instead
# Swagger Editor Live

A live swagger editor that saves your changes back to the file.

## Installation

```
npm install swagger-editor-live -g
```

## Usage
```
swagger-editor-live <swagger file path here>
```

You can also specify port number by passing --port option.

``` 
swagger-editor-live <swagger file path here> --port=8000
```

You may also change the host, usefull if you're using this inside a docker.

```
swagger-editor-live <swagger file path here> --host=0.0.0.0
```

If you're using multiple files with swagger then u want to specify where they are located like this

```
swagger-editor-live <swagger file path here> --folder=api
```


