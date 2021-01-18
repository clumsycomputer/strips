import {
  Type as Codec,
  Errors as DecodeErrors,
  ContextEntry,
  ValidationError,
} from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'

export interface DecodeDataApi<
  TargetData,
  InputData extends any = unknown,
  TargetCodec extends Codec<TargetData> = Codec<
    TargetData,
    TargetData,
    InputData
  >
> {
  targetCodec: TargetCodec
  inputData: InputData
}

export const decodeData = <TargetData>(
  api: DecodeDataApi<TargetData>
): Promise<TargetData> => {
  const { targetCodec, inputData } = api
  return new Promise<TargetData>((resolve, reject) => {
    const handleDecodeErrors = (decodeErrors: DecodeErrors) => {
      const simpleDecodeError = getSimpleDecodeError({ decodeErrors })
      reject(simpleDecodeError)
    }
    const decodeResult = targetCodec.decode(inputData)
    pipe(decodeResult, fold(handleDecodeErrors, resolve))
  })
}

interface GetSimpleDecodeErrorApi {
  decodeErrors: DecodeErrors
}

const getSimpleDecodeError = (api: GetSimpleDecodeErrorApi): Error => {
  const { decodeErrors } = api
  const validationErrors = decodeErrors.map((validationError) =>
    getValidationErrorSpecifics({ validationError })
  )
  const validationErrorsJson = JSON.stringify(validationErrors, null, 2)
  return Error(validationErrorsJson)
}

interface GetValidationErrorSpecificsApi {
  validationError: ValidationError
}

const getValidationErrorSpecifics = (
  api: GetValidationErrorSpecificsApi
): ContextEntry => {
  const { validationError } = api
  return validationError.context[validationError.context.length - 1]
}
