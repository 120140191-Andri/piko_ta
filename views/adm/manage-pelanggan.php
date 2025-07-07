<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Piko CarWash & Caffe | Dashboard</title>
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
      background: #666;
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
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Manage Pelanggan</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#" style="color: black;">Dashboard</a></li>
              <li class="breadcrumb-item active">Manage Pelanggan</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Daftar Pelanggan</h3>
            </div>
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Nama Pelanggan</th>
                    <th>Email</th>
                    <th>Total Pesanan Makanan/Minuman</th>
                    <th>Total Mencuci</th>
                    <th>Voucher Diskon Saat ini (%)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dummy Nama</td>
                    <td>dummy.email@example.com</td>
                    <td>10</td>
                    <td>5</td>
                    <td>0</td>
                    <td>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#voucherModal">Beri Voucher Diskon</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Dummy Nama 2</td>
                    <td>dummy2.email@example.com</td>
                    <td>12</td>
                    <td>50</td>
                    <td>10%</td>
                    <td>
                      <button class="btn btn-primary disabled" style="background: #888;" data-toggle="modal" data-target="#voucherModal">Beri Voucher Diskon</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <footer class="main-footer">
    <strong>Copyright &copy; by Piko CarWash & Caffe.</strong>
    All rights reserved.
  </footer>
</div>
<div class="modal fade" id="voucherModal" tabindex="-1" role="dialog" aria-labelledby="voucherModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="voucherModalLabel">Beri Voucher Diskon</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="discountPercentage">Persentase Diskon (%)</label>
            <input type="number" class="form-control" id="discountPercentage" placeholder="Masukan Persentase Diskon">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-success">Kirim Voucher</button>
      </div>
    </div>
  </div>
</div>
<script src="assets/plugins/jquery/jquery.min.js"></script>
<script src="assets/plugins/jquery-ui/jquery-ui.min.js"></script>
<script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/2.0.1/js/dataTables.js"></script>
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
