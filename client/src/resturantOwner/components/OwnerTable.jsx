import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  gridClasses,
} from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const AdminTable = (props) => {
  const header = [...props.header]
  const body = [...props.body]

  return (
      <DataGrid
        style={{backgroundColor: '#fff', width: '93%', margin : '10px 3.5%'}}
        columnBuffer="6"
        disableVirtualization="true"
        autoPageSize="true"
        autoHeight="false"
        columns={header}
        rows={body}
        rowHeight={32}
        pageSize={10}
        loading={props.loading}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
  );
}

export default AdminTable