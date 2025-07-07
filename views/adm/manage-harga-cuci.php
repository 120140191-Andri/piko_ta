<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Piko CarWash & Caffe | Manage Harga Cuci</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="assets/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="assets/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="assets/dist/css/adminlte.min.css">
  <link rel="stylesheet" href="assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <link rel="stylesheet" href="assets/plugins/daterangepicker/daterangepicker.css">
  <link rel="stylesheet" href="assets/plugins/summernote/summernote-bs4.css">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.datatables.net/2.0.1/css/dataTables.dataTables.css" />
  <style>
    body {
      background-color: #e0e0e0;
      color: #000;
    }
    .card {
      background: #fff;
      border: 1px solid #ccc;
    }
    .card-header {
      background-color: #555 !important;
      color: #fff;
    }
    .input-group-text {
      background: #777;
      color: #fff;
    }
    .btn {
      background: #888;
      color: #fff;
    }
    .btn:hover {
      background: #666;
    }
    .main-footer {
      background: #222;
      color: #fff;
    }
  </style>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <?php  include 'komponen/side_bar.php'; ?>

  <div class="content-wrapper">
    <section class="content">
      <div class="container-fluid">
        <div class="card card-info">
          <div class="card-header">
            <h3 class="card-title">Manage Menu Kafe</h3>
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Layanan</th>
                  <th>Harga</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Cuci Mobil</td>
                  <td>50000</td>
                  <td>
                    <button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#modalEdit">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>

  <footer class="main-footer">
    <strong>Copyright &copy; by Piko CarWash & Caffe</strong>
    All rights reserved.
  </footer>
</div>

<!-- Modal Edit Menu -->
<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Harga</h5>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label>Nama Layanan</label>
            <input type="text" class="form-control" value="Cuci Mobil">
          </div>
          <div class="form-group">
            <label>Harga</label>
            <input type="number" class="form-control" value="50000">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Simpan Perubahan</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
      </div>
    </div>
  </div>
</div>

<script src="assets/plugins/jquery/jquery.min.js"></script>
<script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/dist/js/adminlte.js"></script>

<script>
  $(function () {
    $("#example1").DataTable({
      "responsive": true,
      "autoWidth": false
    });
  });
</script>

</body>
</html>
