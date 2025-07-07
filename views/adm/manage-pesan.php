<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Piko CarWash & Caffe | Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
  <link rel="stylesheet" href="assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
  <link rel="stylesheet" href="assets/plugins/jqvmap/jqvmap.min.css">
  <link rel="stylesheet" href="assets/dist/css/adminlte.min.css">
  <link rel="stylesheet" href="assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <link rel="stylesheet" href="assets/plugins/daterangepicker/daterangepicker.css">
  <link rel="stylesheet" href="assets/plugins/summernote/summernote-bs4.css">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Piko CarWash & Caffe | Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
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
            <h3 class="card-title">Pesan</h3>
          </div>
          <div class="card-body">
            <form action="#" method="POST" role="form" id="quickForm">
              <label>Ubah Isi Pesan</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="nav-icon fas fa-message"></i></span>
                </div>
                <textarea name="pesan" class="form-control" placeholder="Masukan Pesan" rows="5">Selamat Datang Di Piko Carwash & Caffe</textarea>
              </div>
              <hr>
              <div class="input-group mb-3">
                <input type="submit" class="form-control btn btn-success" value="Ubah">
              </div>
            </form>
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

<script src="assets/plugins/jquery/jquery.min.js"></script>
<script src="assets/plugins/jquery-ui/jquery-ui.min.js"></script>
<script>
  $.widget.bridge('uibutton', $.ui.button)
</script>
<script src="assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/plugins/chart.js/Chart.min.js"></script>
<script src="assets/plugins/sparklines/sparkline.js"></script>
<script src="assets/plugins/jqvmap/jquery.vmap.min.js"></script>
<script src="assets/plugins/jqvmap/maps/jquery.vmap.usa.js"></script>
<script src="assets/plugins/jquery-knob/jquery.knob.min.js"></script>
<script src="assets/plugins/moment/moment.min.js"></script>
<script src="assets/plugins/daterangepicker/daterangepicker.js"></script>
<script src="assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
<script src="assets/plugins/summernote/summernote-bs4.min.js"></script>
<script src="assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<script src="assets/dist/js/adminlte.js"></script>
<script src="assets/dist/js/pages/dashboard.js"></script>
<script src="assets/dist/js/demo.js"></script>
</body>
</html>
