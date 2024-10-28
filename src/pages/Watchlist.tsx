
import { useWatchlist } from '../contexts/WatchlistContext';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  styled
} from '@mui/material';
import Navbar from '../components/Navbar';


// Styled components
const Container = styled('div')({
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
});

const Title = styled(Typography)({
  marginBottom: '2rem',
  textAlign: 'center',
});

const ImageContainer = styled('div')({
  width: '80px',
  height: '120px',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const StatusChip = styled('span')<{ isliked: number }>(({ isliked }) => ({
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: isliked ? '#e8f5e9' : '#ffebee',
  color: isliked ? '#2e7d32' : '#c62828',
  fontSize: '0.875rem',
}));

// Types
type Movie = {
  id: string;
  title: string;
  image: string;
  review: string;
  isLiked: boolean;
};

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const columnHelper = createColumnHelper<Movie>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Movie Name',
      cell: info => (
        <Typography variant="body1" fontWeight="medium">
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => (
        <ImageContainer>
          <img src={info.getValue()} alt={info.row.original.title} />
        </ImageContainer>
      ),
    }),
    columnHelper.accessor('review', {
      header: 'Review',
      cell: info => (
        <Typography variant="body2">
          {info.getValue() || 'No review'}
        </Typography>
      ),
    }),
    columnHelper.accessor('isLiked', {
      header: 'Status',
      cell: info => (
        <StatusChip isliked={info.getValue() ? 1 : 0}>
          {info.getValue() ? 'Liked' : 'Not Liked'}
        </StatusChip>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Action',
      cell: info => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => removeFromWatchlist(info.getValue())}
        >
          Remove
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: watchlist,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  

  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  

  return (
    <>
    <Navbar username={user.name} />
    <Container>
      
        <Title variant="h4">Your Watchlist</Title>

      
      

      {watchlist.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="textSecondary">
            Your watchlist is currently empty
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <StyledTableCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    </>
  );
};

export default WatchlistPage;