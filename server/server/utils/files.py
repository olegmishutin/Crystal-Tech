import os


def delete_old_files(*args):
    for file in args:
        if file and os.path.exists(file.path):
            os.remove(file.path)


def set_new_file(model, field_name, file):
    if file is not None:
        delete_old_files(getattr(model, field_name))
        setattr(model, field_name, file)
