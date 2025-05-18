import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommonResponseDto } from './common.response.dto';

export function ApiCommonOkResponse<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiExtraModels(CommonResponseDto, model),
    ApiOkResponse({
      description: '성공 응답',
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
}
