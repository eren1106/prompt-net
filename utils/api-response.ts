import { STATUS_CODES } from "@/constants/status-codes";
import { NextResponse } from "next/server";

// const nextResponse = (
//   message: string,
//   data: any,
//   status: string,
//   statusCode: number,
//   extra?: any,
// ) => NextResponse.json({
//   message: message,
//   data: data,
//   status: status,
//   extra: extra || '',
// }, { status: statusCode });

interface INextResponse {
  message: string;
  data?: any;
  status?: string;
  statusCode?: number;
  extra?: any;
}

const nextResponse = (
  {
    message,
    data,
    status,
    statusCode,
    extra,
  }: INextResponse
) => NextResponse.json({
  message: message,
  data: data,
  status: status || 'SUCCESS',
  extra: extra || '',
}, { status: statusCode || STATUS_CODES.OK });

export const getApiResponse = <T>(result: T) => {
  if (Array.isArray(result) && result.length === 0) {
    return noResultArrayResponse();
  }
  if (!result) {
    return noResultResponse();
  } else {
    return resultFoundResponse(result);
  }
}

export const errorResponse = (error: any, result?: any) => {
  return nextResponse({
    message: error,
    extra: result,
    status: 'FAILED',
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
  })
}

export const postApiResponse = <T>(result: T, name?: string) => {
  return nextResponse({
    message: (name || 'Data') + ' created',
    data: result,
  });
}

export const putApiResponse = <T>(result: T, name?: string) => {
  if(!result) return noResultResponse();
  return nextResponse({
    message: (name || 'Data') + ' updated',
    data: result,
  });
}

export const deleteApiResponse = <T>(result: T, name?: string) => {
  if(!result) return noResultResponse();
  return nextResponse({
    message: (name || 'Data') + ' deleted',
    data: result,
    extra: '',
  });
}

const noResultResponse = () => {
  return nextResponse({
    message: 'Data not found',
    status: 'FAILED',
    statusCode: STATUS_CODES.NOT_FOUND,
  });
}

const noResultArrayResponse = () => {
  return nextResponse({
    message: 'No results found',
    data: [],
  });
}

const resultFoundResponse = <T>(result: T) => {
  return nextResponse({
    message: 'Results found',
    data: result,
  });
}

// const getApiResponseOneRecord = <T>(result: T) => {
//   if (!result) {
//     const error = new Error('No data');
//     throw error;
//   } else {
//     return resultFoundResponse(result);
//   }
// }

// const getApiResponseArray = <T>(result: T[]) => {
//   if (Array.isArray(result)) {
//     if (result.length === 0) {
//       return {
//         message: 'An array of results retrieved successfully',
//         data: [],
//         extra: '',
//       };
//     } else {
//       return {
//         message: 'An array of results retrieved successfully',
//         data: result,
//         extra: '',
//       };
//     }
//   } else {
//     throw new CustomError(
//       'Result is not an array',
//       HttpStatus.INTERNAL_SERVER_ERROR,
//     );
//   }
// }

// const upsertApiResponse = <T>(result: T, name?: string) => {
//   return {
//     message: name + ' upserted',
//     data: result,
//     extra: '',
//   };
// }

// const updateApiFailedResponse = <T>(result: T, msg?: string) => {
//   return {
//     message: 'Error: ' + msg,
//     data: result,
//     extra: 'true',
//   };
// }