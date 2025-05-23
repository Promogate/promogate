import { Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './pagination-item';

type PaginationProps = {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const siblingsCount = 1;

  function generatePageArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      .filter(page => page > 0);
  }

  const previousPage = currentPage > 1
    ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack
      direction={['column', 'row']}
      spacing={['6']}
      justify={['flex-end']}
      align={['center']}
    >
      <Stack
        direction={['row']}
        spacing={['2']}
      >

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text
                color={'gray.400'}
                width={'8'}
                textAlign={'center'}
              >...</Text>
            )}
          </>
        )}

        {previousPage.length > 0 && previousPage.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {(currentPage + siblingsCount < lastPage) && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text
                color={'gray.400'}
                width={'8'}
                textAlign={'center'}
              >...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}